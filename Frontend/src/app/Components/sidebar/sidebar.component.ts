import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router} from '@angular/router';
import {SidebarService} from '../../Services/sidebar.service';
import {MessagingService} from '../../Services/messaging.service';
import {NotifierService} from 'angular-notifier';
import { NotificationService } from 'src/app/Services/notification.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menus;
  message;
  auths = {};
  role: string;
  loggedUser;
  notifications=[1,5,65,7,8];
  private readonly notifier: NotifierService;

  constructor(private sideBarService: SidebarService,
              private authService: AuthService,
              private router: Router,
              private messagingService: MessagingService,
              notifierService: NotifierService,
              private notificationService:NotificationService
    ) {
    this.notifier = notifierService;
  }



  ngOnInit() {

    this.loadLoggedUser();
    this.listenToAuthentication();
    this.notify();
    

    const userId = 'user002';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

  }

  listenToAuthentication() {

    this.authService.eventCallback$.subscribe(postes => {
         this.loadLoggedUser();
     });

  }

  loadLoggedUser() {
    console.log('loggedUser');
    this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.loggedUser);
    if (this.loggedUser) {
      this.role = this.loggedUser.authorities[0].authority;
      this.loadNotifications(this.loggedUser.id);
      console.log('role');
      console.log(this.role);
    }
  }

   logout() {
     console.log('logout');
     this.authService.logout();
     this.router.navigate(['/Login']);
     this.loggedUser = {};
     this.role='';
     console.log(this.authService.loggedIn());
   }

   notify() {
     this.messagingService.eventCallback$.subscribe(postes => {
        this.notifier.notify( 'success', 'woslotek notif');
        this.loadNotifications(this.loggedUser.id);
     });
   }

   //get current user's notifications
  loadNotifications(userId){
    this.notificationService.getNotifications(userId)
       .subscribe(notifications=>{
         console.log("hello notification")
         console.log(notifications);
          this.notifications=notifications;
       })
}

 getNotificationDetails(notification){
 //sending notification to component notification-details throug notification service
      
        
         
     if(notification.content=="CONFIRMATION"){
         this.notificationService.emitNotification(notification);
         this.router.navigate(['/ConfirmedJobDemande']);
     }
     else if(notification.content=="JOB_DEMANDE_SENT"){
        this.notificationService.emitNotification(notification);
        this.router.navigate(['/JobDemande']);
     }
     else{
         this.notificationService.emitNotification(notification);
         this.router.navigate(['/Notification']);
     }
   }
}
