import { Component, OnInit } from '@angular/core';

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
  
  value: number = 0;
  constructor(
    private userService: UserService,

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
    this.userService.getCurrentUser().subscribe(user=>{
      this.user=user;

      this.userFormGroup.patchValue({
        username : this.user.username,
        email : this.user.email,
        firstName : this.user.firstName,
        lastName : this.user.lastName,
        age:this.user.age,
        gender:this.user.gender
      })
      this.image=this.url
    });
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
      image:this.url
    };
     console.log("hello");
      console.log(data);
     var id=this.user.id;
    this.userService.updateUser(id, data).subscribe(product => {
      this.showSuccess('Votre profil a été mis a jour','Profil Modifie' ,'success' );
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
onUpload(event) {
  this.Uploading = true;
  this.Uploaded = false;

  for(let file of event.files) {

      this.uploadedFiles.push(file);
  }

}
changeListener(event) : void {
  this.Uploading = true;
  this.Uploaded = false;
  for(let file of event.files) {

    this.readThis(file);
}



}





url:any=null;
onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
}








readThis(inputValue: any): void {
  var file:File = inputValue;
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
   // this.updateImage(myReader.result);

  }
  myReader.readAsDataURL(file);
}/*
updateImage(imageUrl) {



  let data = {
    image:imageUrl
  };

    console.log(data);

  this.userService.updateUser(this.user.id, data).subscribe(user => {
    this.showSuccess('Votre photo a été mis a jour','Profil Modifié' ,'success' );
    this.loadUser();


    this.Uploading = false;
    this.Uploaded = true;

},err =>{

this.showSuccess('Erreur ',err.error.Error,'error')
});
}*/
}




