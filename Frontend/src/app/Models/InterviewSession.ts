export default class InterviewSession {

  id: number;
  jobRequestId: number;
  fromTimeInterval: string;
  toTimeInterval: string;
  jobName: string;
  enterpriseUsername: string;
  jobSeekerName: string;

  constructor(jobRequestId: number, fromTimeInterval: string, toTimeInterval: string, jobName: string, enterpriseUsername: string, jobSeekerName: string) {
    this.jobRequestId = jobRequestId;
    this.fromTimeInterval = fromTimeInterval;
    this.toTimeInterval = toTimeInterval;
    this.jobName = jobName;
    this.enterpriseUsername = enterpriseUsername;
    this.jobSeekerName = jobSeekerName;
  }

}
