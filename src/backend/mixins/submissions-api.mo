import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import Types "../types/submissions";
import SubmissionsLib "../lib/submissions";

mixin (
  accessControlState : AccessControl.AccessControlState,
  submissions : Map.Map<Common.SubmissionId, Types.Submission>,
  state : { var nextId : Common.SubmissionId },
) {
  /// Student: submit a new project request
  public shared ({ caller }) func submitProject(req : Types.SubmitRequest) : async Common.SubmissionId {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to submit a project");
    };
    let id = state.nextId;
    state.nextId += 1;
    let sub = SubmissionsLib.newSubmission(id, caller, req, Time.now());
    submissions.add(id, sub);
    id;
  };

  /// Student: list their own submissions
  public query ({ caller }) func getMySubmissions() : async [Types.SubmissionPublic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view submissions");
    };
    let results = List.empty<Types.SubmissionPublic>();
    for ((_, sub) in submissions.entries()) {
      if (sub.studentPrincipal == caller) {
        results.add(SubmissionsLib.toPublic(sub));
      };
    };
    results.toArray();
  };

  /// Student: get a single submission (own only)
  public query ({ caller }) func getMySubmission(id : Common.SubmissionId) : async ?Types.SubmissionPublic {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to view a submission");
    };
    switch (submissions.get(id)) {
      case (?sub) {
        if (sub.studentPrincipal == caller) {
          ?SubmissionsLib.toPublic(sub);
        } else {
          null;
        };
      };
      case null { null };
    };
  };

  /// Admin: list all submissions
  public query ({ caller }) func getAllSubmissions() : async [Types.SubmissionPublic] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all submissions");
    };
    let results = List.empty<Types.SubmissionPublic>();
    for ((_, sub) in submissions.entries()) {
      results.add(SubmissionsLib.toPublic(sub));
    };
    results.toArray();
  };

  /// Admin: update submission status
  public shared ({ caller }) func updateSubmissionStatus(
    id : Common.SubmissionId,
    newStatus : Types.SubmissionStatus,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update submission status");
    };
    switch (submissions.get(id)) {
      case (?sub) {
        SubmissionsLib.appendStatus(sub, newStatus, Time.now());
      };
      case null { Runtime.trap("Submission not found") };
    };
  };

  /// Admin: update admin notes
  public shared ({ caller }) func updateAdminNotes(
    id : Common.SubmissionId,
    notes : Text,
  ) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update admin notes");
    };
    switch (submissions.get(id)) {
      case (?sub) { sub.adminNotes := notes };
      case null { Runtime.trap("Submission not found") };
    };
  };

  /// Public: get charges/pricing for each project type
  public query func getCharges() : async [Types.Charge] {
    [
      SubmissionsLib.getCharge(#tenth_twelfth_handwritten),
      SubmissionsLib.getCharge(#graduation_pdf_only),
      SubmissionsLib.getCharge(#graduation_pdf_binding),
    ];
  };
};
