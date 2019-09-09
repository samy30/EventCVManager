import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {take} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject(null);
  private eventCallback = new Subject<boolean>(); // Source
  eventCallback$ = this.eventCallback.asObservable(); // Stream

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private authService: AuthService) {
    this.angularFireMessaging.messaging.subscribe(
      // tslint:disable-next-line:variable-name
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
  }

  updateToken(userId, token) {
    if (userId) {
    this.authService.updateUserNotificationToken(userId, token).subscribe(res => {
      console.log('notificationTokenSent');
    });
    }
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.emitNotification();
        this.currentMessage.next(payload);
      });
  }
  emitNotification() {
    this.eventCallback.next(true);
  }



}
