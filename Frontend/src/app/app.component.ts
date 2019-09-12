import { Component, OnInit } from '@angular/core';
import { NotificationService } from './Services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  constructor(private notificationService: NotificationService){

  }

  ngOnInit() {

  }
}
