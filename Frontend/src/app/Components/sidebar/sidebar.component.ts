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
  private readonly notifier: NotifierService ;

  constructor(private sideBarService: SidebarService,
              private authService: AuthService,
              private router: Router,
              private messagingService: MessagingService
    ) { }

    loggedUser;

  ngOnInit() {

    console.log('sidebar');
    console.log(this.authService.loggedIn());
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
    this.authService.getCurrentUser()
      .subscribe(user => {
        console.log('current');
        console.log(user);
        this.loggedUser = user;
        this.role = this.loggedUser.authorities[0].authority;
        console.log('role');
        console.log(this.role);
     },
     err => {
         console.log('user non authenticated');
     });
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
       alert(postes);
       
     });
   }
}
