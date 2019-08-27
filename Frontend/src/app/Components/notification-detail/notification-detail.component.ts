import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {

  constructor(private notificationService:NotificationService) { }

  notification;

  ngOnInit() {
    this.loadNotification();
  }

  loadNotification(){
        this.notificationService.eventCallback$.subscribe(notification => {
          console.log("notification");
          console.log(notification);
           this.notification=notification;
     })
    }

}
