import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from  '@angular/router';
import {SidebarService} from "../../Services/sidebar.service";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  menus;
  auths = {};
  role:string;

  constructor(private sideBarService: SidebarService,
    private authService:AuthService,
     private router:Router
    ) { }

    loggedUser;

  ngOnInit() {

    console.log("sidebar");
    console.log(this.authService.loggedIn());
    this.loadLoggedUser();
    this.listenToAuthentication();

  }

  listenToAuthentication(){

    this.authService.eventCallback$.subscribe(postes => {
         this.loadLoggedUser();
     });

  }

  loadLoggedUser(){
    this.authService.getCurrentUser()
      .subscribe(user=>{
        console.log("current");
        console.log(user);
        this.loggedUser=user;
        this.role=this.loggedUser.authorities[0].authority;
        console.log("role");
        console.log(this.role);
     },
     err=>{
         console.log("user non authenticated")
     });
  }

   logout(){
     console.log("logout");
      this.authService.logout();
      this.router.navigate(["/Login"]);
      this.loggedUser={};
      this.role='';
      console.log(this.authService.loggedIn());
   }
}
