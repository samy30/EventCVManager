import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router} from '@angular/router';
import {SidebarService} from '../../Services/sidebar.service';
import {MessagingService} from '../../Services/messaging.service';
import {NotifierService} from 'angular-notifier';
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
  private readonly notifier: NotifierService;

  constructor(private sideBarService: SidebarService,
              private authService: AuthService,
              private router: Router,
              private messagingService: MessagingService,
              notifierService: NotifierService
    ) {
    this.notifier = notifierService;
  }



  ngOnInit() {

    console.log('sidebar');
    console.log(this.authService.loggedIn());
    this.loadLoggedUser();
    this.listenToAuthentication();
    this.notify();


    if (this.loggedUser) {
      this.userId = this.loggedUser.id;
    }
    this.messagingService.requestPermission(this.userId);
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
      console.log('role');
      console.log(this.role);
    }
  }

   logout() {
     console.log('logout');
     this.authService.logout();
     this.router.navigate(['/Login']);
     this.loggedUser = {};
     this.role = '';
     console.log(this.authService.loggedIn());
   }

   notify() {
     this.messagingService.eventCallback$.subscribe(postes => {
       this.notifier.notify( 'success', 'woslotek notif');
     });
   }
}
