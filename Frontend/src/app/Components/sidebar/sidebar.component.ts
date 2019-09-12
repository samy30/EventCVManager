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
  userId;
  notifications:any[]=[];
  senders:any[]=[];
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
    this.listenToProfileChange();

    if (this.loggedUser) {
      this.userId = this.loggedUser.id;
    }
    this.messagingService.requestPermission(this.userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;

  }

  listenToProfileChange(){
      this.notificationService.profileCallback$
        .subscribe(user=>{
           this.loggedUser = JSON.parse(localStorage.getItem('currentUser'));
           if (this.loggedUser) {
            this.role = this.loggedUser.roles? this.loggedUser.roles[0].name: this.loggedUser.authorities[0].authority;
                                             
           }
        })
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
      this.userId=this.loggedUser.is;
       this.role = this.role = this.loggedUser.roles? this.loggedUser.roles[0].name:this.loggedUser.authorities[0].authority;            
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
         this.getUnreadNotificationCount(userId);
          this.notifications=notifications.reverse();
          this.loadSenders(notifications);
       })
}


   loadSenders(notifications){
     this.senders=[];
         notifications.map(notif=>this.getSender(notif));
  
     }

    getSender(notif){
        this.authService.getUser(notif.senderID)
              .subscribe(user=>{
                this.senders.push(user);
              })
      }
    getName(i){
      console.log("senders");
      console.log(this.senders);
      return this.senders[i].username;
    }

    getUnreadNotificationCount(id){
        this.notificationService.getUnreadNotificationCount(id)
           .subscribe(count=>{
             console.log("unseen count");
             console.log(count);
                this.myFunction(count);
           })
    }

 getNotificationDetails(notification){
 //sending notification to component notification-details throug notification service
      //update notification stuts=seen
     
     this.notificationService.makeSeen(notification.id)
          .subscribe(notif=>{
              console.log("notification seen");
             console.log(notif)
             this.loadNotifications(this.userId);
         })
   
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

   myFunction(nb){
          
        var el = document.querySelector('.notification');
        var count = Number(nb);
        el.classList.remove('show-count');  
        el.setAttribute('data-count', (count).toString());
        el.classList.remove('notify');
        el.classList.add('notify');    
       if(count!==0) el.classList.add('show-count');     
   }
}
