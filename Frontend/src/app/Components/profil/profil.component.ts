import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import {UserService} from "../../Services/user.service";
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notification.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [MessageService]
})
export class ProfilComponent implements OnInit {
  userFormGroup: FormGroup;
  enterpriseFormGroup: FormGroup;
  user: any;
  image;
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  imgURL:any=null;
  value: number = 0;
  genres=['male','female'];
  genresFr=['Homme','Femme'];
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService:AuthService,
    private notificationService:NotificationService) {
      this.userFormGroup = this.formBuilder.group({
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [ Validators.required, Validators.email]],
        age: ['',  Validators.required],
        gender: ['',  Validators.required],
        town: ['',  Validators.required],
      });
      this.enterpriseFormGroup = this.formBuilder.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        email: ['', [ Validators.required, Validators.email]],
        description: ['',  Validators.required],
        activity: ['',  Validators.required]
      });
    }
  role: null;


  ngOnInit() {
    this.loadUser();
  }
  loadUser() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("user profil");
    console.log(this.user);
    this.userFormGroup.patchValue({
      username : this.user.username,
      email : this.user.email,
      firstName : this.user.firstName,
      lastName : this.user.lastName,
      age: this.user.age,
      gender: this.user.gender,
      town: this.user.town
    });
    this.enterpriseFormGroup.patchValue({
      name : this.user.name,
      username: this.user.username,
      email: this.user.email,
      description: this.user.description,
      activity: this.user.activity
    });
    this.image = this.user.image;
    console.log('profile image');
    console.log(this.image);
    this.role = this.user.authorities?this.user.authorities[0].authority:this.user.roles[0].name;
  }
  updateUser() {
    const {username, email, firstName, lastName, age, gender,town} = this.userFormGroup.value;
    const data = {
      username,
      email,
      firstName,
      lastName,
      age,
      gender,
      town,
      image: this.imgURL
    };
    console.log('hello');
    console.log(data);
    const id = this.user.id;
    this.userService.updateUser(id, data).subscribe(user => {
      this.showSuccess('Votre profil a été mis a jour', 'Profil Modifie' , 'success' );
      console.log(user);
      this.authService.setCurrentUser(user);
      this.notificationService.emitProfileChange(user);
      this.loadUser();

    }, err => {
      this.showSuccess('Erreur ', err.error.message, 'error');
    });
  }

  updateEnterprise() {
    const {name, username, email, description, activity} = this.enterpriseFormGroup.value;
    const data = {
      username,
      email,
      name,
      description,
      activity,
      image: this.imgURL
    };
    console.log('hello');
    console.log(data);
    const id = this.user.id;
    this.userService.updateUser(id, data).subscribe(user => {
      this.showSuccess('Votre profil a été mis a jour', 'Profil Modifie' , 'success' );
      console.log(user);
      this.authService.setCurrentUser(user);
      this.notificationService.emitProfileChange(user);
      this.loadUser();

    }, err => {
      this.showSuccess('Erreur ', err.error.message, 'error');
    });
  }

  showSuccess( title , message, type) {
    this.msgs = [];
    this.msgs.push({severity: type, summary: title, detail: message });
    setTimeout(() => {
      this.msgs = [];
    }, 2000);
  }

  getImage(imgURL) {
    this.imgURL = imgURL;
  }

}


