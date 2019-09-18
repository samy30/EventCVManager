import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

import {JobDemandeService} from '../../Services/job-demande.service';
import JobRequest from '../../Models/jobRequest';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {InterviewService} from '../../Services/interview.service';
import InterviewCalendar from '../../Models/InterviewCalendar';
import InterviewSession from '../../Models/InterviewSession';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-interview-calendar-component',
  styleUrls: ['interview-calendar.component.scss'],
  templateUrl: 'interview-calendar.component.html'
})
export class InterviewCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Day;
  interviewDate = '2019-09-27';
  viewDate: Date = new Date(this.interviewDate);
  selectedJobRequestId: number;

  modalData: {
    startTime: Date,
    endTime: Date
  };

  // actions: CalendarEventAction[] = [
  //   // {
  //   //   label: '<i class="fa fa-fw fa-pencil"></i>',
  //   //   onClick: ({ event }: { event: CalendarEvent }): void => {
  //   //     this.handleEvent('Edited', event);
  //   //   }
  //   // },
  //   {
  //     label: '<i class="fa fa-fw fa-times"></i>',
  //     onClick: ({ event }: { event: CalendarEvent }): void => {
  //       this.events = this.events.filter(iEvent => iEvent !== event);
  //       this.assignedJobRequestsIds.splice(this.assignedJobRequestsIds.findIndex(assignedJobRequestId =>
  //         assignedJobRequestId === event.id), 1);
  //     }
  //   }
  // ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  jobRequests: Array<JobRequest> = [];
  interviewSessionsTitles: Map<number, string> = new Map<number, string>();
  assignedJobRequestsIds: Array<number> = [];
  jobRequestIdToIndex: Map<number, number> = new Map<number, number>();
  interviewSessions = [];

  constructor(
    private modal: NgbModal,
    private jobDemandeService: JobDemandeService,
    private interviewService: InterviewService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const role = currentUser.authorities[0].authority;
    if (role === 'ROLE_ENTERPRISE') {
      this.interviewService.getInterviewSessionsByEnterpriseUsername(currentUser.username).subscribe(
        interviewSessions => {
          this.interviewSessions = interviewSessions;
          this.parseInterviewSessions();
        }
      );
    } else if (role === 'ROLE_USER') {
      this.interviewService.getInterviewSessionsByCandidateUsername(currentUser.username).subscribe(
        interviewSessions => {
          this.interviewSessions = interviewSessions;
          this.parseInterviewSessions();
        }
      );
    }
  }

  parseInterviewSessions() {
    this.interviewSessions.forEach(interviewSession => {
      console.log(this.interviewDate + 'T' + interviewSession.fromTimeInterval + ':00');
      this.events = [...this.events, {
        title: interviewSession.enterpriseUsername + '\'s interview with ' + interviewSession.jobSeekerName +
          ', ' + interviewSession.jobName,
        start: new Date(this.interviewDate + 'T' + interviewSession.fromTimeInterval + ':00'),
        end: new Date(this.interviewDate + 'T' + interviewSession.toTimeInterval + ':00'),
        color: colors.red
      }];
    });
    console.log(this.events);
  }
    // this.jobDemandeService.getJobRequestsConfirmedByEnterprise().subscribe(jobRequests => {
    //   this.jobRequests = jobRequests;
    //   this.jobRequests.forEach((jobRequest, index) => {
    //     this.interviewSessionsTitles.set(jobRequest.id,
    //       jobRequest.enterpriseUsername + '\'s interview with ' + jobRequest.jobSeekerName + ', ' + jobRequest.jobName
    //     );
    //     this.jobRequestIdToIndex.set(jobRequest.id, index);
    //   });
    //   console.log(this.interviewSessionsTitles, this.jobRequestIdToIndex, this.jobRequests);
    //   console.log(this.getNonAssignedJobRequests());
    // });

  // getNonAssignedJobRequests() {
  //   return this.jobRequests.filter(
  //     jobRequest => this.assignedJobRequestsIds.find(
  //       assignedJobRequestId => assignedJobRequestId === jobRequest.id) === undefined
  //   );
  // }
  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: this.interviewSessionsTitles.get(this.selectedJobRequestId),
  //       start: this.modalData.startTime,
  //       end: this.modalData.endTime,
  //       color: colors.red,
  //       actions: this.actions,
  //       draggable: true,
  //       id: this.selectedJobRequestId
  //     }
  //   ];
  //   this.assignedJobRequestsIds.push(this.selectedJobRequestId);
  //   console.log(this.events);
  // }

  // handleInterviewSessionClick(hour: number) {
  //   if (this.getNonAssignedJobRequests().length === 0) {
  //     return;
  //   }
  //   this.modalData = {
  //     startTime: new Date(
  //       this.interviewDate + 'T' + (hour.toString().length < 2 ? '0' + hour.toString() : hour.toString()) + ':00:00'),
  //     endTime: new Date(
  //       this.interviewDate + 'T' + (hour.toString().length < 2 ? '0' + hour.toString() : hour.toString()) + ':30:00')
  //   };
  //   console.log( {
  //     startTime: this.interviewDate + 'T' + (hour.toString().length < 2 ? '0' + hour.toString() : hour.toString()) + ':00:00',
  //     endTime: this.interviewDate + 'T' + (hour.toString().length < 2 ? '0' + hour.toString() : hour.toString()) + ':30:00'
  //   });
  //   // First Option Assigned
  //   this.onOptionSelected(this.getNonAssignedJobRequests()[0].id.toString());
  //   this.modal.open(this.modalContent, { size: 'lg' });
  // }
  //
  // onOptionSelected(selectedJobRequestId: string) {
  //   this.selectedJobRequestId = parseInt(selectedJobRequestId, 10);
  //   console.log(typeof(this.selectedJobRequestId), this.interviewSessionsTitles.get(this.selectedJobRequestId));
  // }
  //
  // submitInterviewCalendar() {
  //   console.log(this.assignedJobRequestsIds, this.events);
  //   const interviewSessions = this.assignedJobRequestsIds
  //     .map(assignedJobRequestId => {
  //       const calendarEvent = this.events.find(event => event.id === assignedJobRequestId);
  //       const startTime = this.parseHour(calendarEvent.start.getHours()) + ':' + this.parseMinute(calendarEvent.start.getMinutes());
  //       const endTime = this.parseHour(calendarEvent.end.getHours()) + ':' + this.parseMinute(calendarEvent.end.getMinutes());
  //       return new InterviewSession(
  //         assignedJobRequestId,
  //         startTime,
  //         endTime,
  //         this.jobRequests[this.jobRequestIdToIndex.get(assignedJobRequestId)].jobName,
  //         this.jobRequests[this.jobRequestIdToIndex.get(assignedJobRequestId)].enterpriseUsername,
  //         this.jobRequests[this.jobRequestIdToIndex.get(assignedJobRequestId)].jobSeekerName,
  //       );
  //     });
  //   const interviewCalendar = new InterviewCalendar(interviewSessions);
  //   console.log(interviewCalendar);
  //   this.interviewService.postInterviewCalendar(interviewCalendar).subscribe(
  //     res => console.log(res)
  //   );
  // }
  //
  // parseHour(hour: number) {
  //   return hour.toString().length < 2 ? '0' + hour.toString() : hour.toString();
  // }
  //
  // parseMinute(minute: number) {
  //   return minute.toString().length < 2 ? '0' + minute.toString() : minute.toString();
  // }

}
