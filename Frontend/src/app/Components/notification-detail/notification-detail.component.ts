import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { EnterpriseService } from 'src/app/Services/enterprise.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss']
})
export class NotificationDetailComponent implements OnInit {

  constructor(private notificationService:NotificationService,
      private enterpriseService:EnterpriseService,
      private authService:AuthService) { }

  @Input() notification;
  nameEnterprise;
 
  ngOnInit() {
    console.log("peskich")
     console.log(this.notification);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(changes.notification.currentValue)
  if(changes.notification.currentValue)  this.loadInformation(changes.notification.currentValue);
   

}

loadInformation(notif){
        this.authService.getUser(notif.senderID)
         .subscribe(enterprise=>{
            this.nameEnterprise=enterprise.name;
         })

}
  

  

}
