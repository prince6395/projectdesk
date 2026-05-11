import Common "../types/common";
import Types "../types/submissions";

module {
  public func toPublic(sub : Types.Submission) : Types.SubmissionPublic {
    {
      id = sub.id;
      studentPrincipal = sub.studentPrincipal;
      studentName = sub.studentName;
      rollNumber = sub.rollNumber;
      enrollmentNumber = sub.enrollmentNumber;
      teacherName = sub.teacherName;
      principalName = sub.principalName;
      classCourse = sub.classCourse;
      projectType = sub.projectType;
      currentStatus = sub.currentStatus;
      statusHistory = sub.statusHistory;
      adminNotes = sub.adminNotes;
      submittedAt = sub.submittedAt;
    };
  };

  public func newSubmission(
    id : Common.SubmissionId,
    caller : Common.UserId,
    req : Types.SubmitRequest,
    now : Common.Timestamp,
  ) : Types.Submission {
    {
      id;
      studentPrincipal = caller;
      studentName = req.studentName;
      rollNumber = req.rollNumber;
      enrollmentNumber = req.enrollmentNumber;
      teacherName = req.teacherName;
      principalName = req.principalName;
      classCourse = req.classCourse;
      projectType = req.projectType;
      var currentStatus = #submitted;
      var statusHistory = [{ status = #submitted; timestamp = now }];
      var adminNotes = "";
      submittedAt = now;
    };
  };

  public func getCharge(projectType : Types.ProjectType) : Types.Charge {
    switch (projectType) {
      case (#tenth_twelfth_handwritten) {
        { projectType; amount = 150; description = "10th/12th Handwritten Project" };
      };
      case (#graduation_pdf_only) {
        { projectType; amount = 200; description = "Graduation Project - PDF Only" };
      };
      case (#graduation_pdf_binding) {
        { projectType; amount = 350; description = "Graduation Project - PDF + Binding" };
      };
    };
  };

  public func appendStatus(
    sub : Types.Submission,
    newStatus : Types.SubmissionStatus,
    now : Common.Timestamp,
  ) {
    let entry : Types.StatusEntry = { status = newStatus; timestamp = now };
    sub.statusHistory := sub.statusHistory.concat([entry]);
    sub.currentStatus := newStatus;
  };
};
