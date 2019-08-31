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

  constructor(private sideBarService: SidebarService,
    private authService:AuthService,
     private router:Router
    ) { }

    loggedUser;

  ngOnInit() {

    console.log("sidebar");
    console.log(this.authService.loggedIn());
    this.loadLoggedUser();

  }
    
  loadLoggedUser(){
    this.authService.getCurrentUser()
      .subscribe(user=>{
        console.log("current");
        console.log(user);
        this.loggedUser=user;
     });
  }

   logout(){
     console.log("logout");
      this.authService.logout();
      this.router.navigate(["/Login"]);
      this.loggedUser={};
      console.log(this.authService.loggedIn());
   }
}
