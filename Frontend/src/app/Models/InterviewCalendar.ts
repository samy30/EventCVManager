import InterviewSession from './InterviewSession';

export default class InterviewCalendar {

  interviewSessionPayloads: Array<InterviewSession>;

  constructor(interviewSessions: Array<InterviewSession>) {
    this.interviewSessionPayloads = interviewSessions;
  }

}
