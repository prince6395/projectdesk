import Common "common";

module {
  public type ProjectType = {
    #tenth_twelfth_handwritten;
    #graduation_pdf_only;
    #graduation_pdf_binding;
  };

  public type SubmissionStatus = {
    #submitted;
    #in_progress;
    #ready_for_pickup;
    #completed;
  };

  public type StatusEntry = {
    status : SubmissionStatus;
    timestamp : Common.Timestamp;
  };

  public type Submission = {
    id : Common.SubmissionId;
    studentPrincipal : Common.UserId;
    studentName : Text;
    rollNumber : Text;
    enrollmentNumber : Text;
    teacherName : Text;
    principalName : Text;
    classCourse : Text;
    projectType : ProjectType;
    var currentStatus : SubmissionStatus;
    var statusHistory : [StatusEntry];
    var adminNotes : Text;
    submittedAt : Common.Timestamp;
  };

  public type SubmissionPublic = {
    id : Common.SubmissionId;
    studentPrincipal : Common.UserId;
    studentName : Text;
    rollNumber : Text;
    enrollmentNumber : Text;
    teacherName : Text;
    principalName : Text;
    classCourse : Text;
    projectType : ProjectType;
    currentStatus : SubmissionStatus;
    statusHistory : [StatusEntry];
    adminNotes : Text;
    submittedAt : Common.Timestamp;
  };

  public type SubmitRequest = {
    studentName : Text;
    rollNumber : Text;
    enrollmentNumber : Text;
    teacherName : Text;
    principalName : Text;
    classCourse : Text;
    projectType : ProjectType;
  };

  public type Charge = {
    projectType : ProjectType;
    amount : Nat;
    description : Text;
  };
};
