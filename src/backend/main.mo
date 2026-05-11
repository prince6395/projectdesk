import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import Types "types/submissions";
import SubmissionsMixin "mixins/submissions-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let submissions = Map.empty<Common.SubmissionId, Types.Submission>();
  let state = { var nextId : Common.SubmissionId = 0 };

  include SubmissionsMixin(accessControlState, submissions, state);
};
