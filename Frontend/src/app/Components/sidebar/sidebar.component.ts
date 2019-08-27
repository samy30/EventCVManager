import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from  '@angular/router';
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

  ngOnInit() {
    this.sideBarService.getMenus(menus=>{
      this.menus=menus
    })
    console.log("sidebar");
    console.log(this.authService.loggedIn());

  }
   logout(){
     console.log("logout");
      this.authService.logout();
      this.router.navigate(["/Login"]);
      console.log(this.authService.loggedIn());
   }
}
