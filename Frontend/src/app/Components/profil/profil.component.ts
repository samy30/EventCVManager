import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import {UserService} from "../../Services/user.service";


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [MessageService]
})
export class ProfilComponent implements OnInit {
  userFormGroup: FormGroup;
  user:any;
  Uploading = false;
  Uploaded = true;
  image;
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  imgURL:any=null;
  value: number = 0;
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private messageService: MessageService) {
      this.userFormGroup = this.formBuilder.group({
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [ Validators.required, Validators.email]],
        age: ['',  Validators.required],
        gender: ['',  Validators.required]
     });

     }

  ngOnInit() {

    this.loadUser();


  }
  loadUser()
  {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.userFormGroup.patchValue({
        username : this.user.username,
        email : this.user.email,
        firstName : this.user.firstName,
        lastName : this.user.lastName,
        age:this.user.age,
        gender:this.user.gender
      })
      this.image=this.user.image;
      console.log("profile image");
      console.log(this.image);
  }
  updateUser() {

    let {username,email,firstName,lastName,age,gender} = this.userFormGroup.value;
    let data = {
      username,
      email,
      firstName,
      lastName,
      age,
      gender,
      image:this.imgURL
    };
     console.log("hello");
      console.log(data);
     var id=this.user.id;
    this.userService.updateUser(id, data).subscribe(user => {
      this.showSuccess('Votre profil a été mis a jour','Profil Modifie' ,'success' );
      console.log(user);
    //  this.
      this.loadUser();

 },err =>{
  this.showSuccess('Erreur ',err.error.message,'error')
 });
}
showSuccess( title , message, type) {
  this.msgs = [];
  this.msgs.push({severity: type, summary: title, detail: message });
  setTimeout(() => {
  this.msgs = [];
    }, 2000);
}

getImage(imgURL){
 this.imgURL=imgURL;
}

}




