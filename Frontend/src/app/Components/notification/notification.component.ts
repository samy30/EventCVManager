import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService:NotificationService,
              private router:Router,
              private route:ActivatedRoute) { }
  notifications:any[]=[];
  ngOnInit() {
   // currentUser=this.loadCurrentUser();
    this.loadNotifications();
  }
  //get current user's notifications
  loadNotifications(){
       this.notificationService.getNotifications()
          .subscribe(notifications=>{
            console.log(notifications);
             this.notifications=notifications;
          })
  }

  getNotificationDetails(notification){
    //sending notification to component notification-details throug notification service
     this.notificationService.emitNotification(notification);
     this.router.navigate(['NotificationDetail'],{relativeTo:this.route});
  }


}
