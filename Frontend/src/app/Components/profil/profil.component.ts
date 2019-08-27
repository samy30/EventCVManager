import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/components/common/message';
import { MessageService } from 'primeng/components/common/messageservice';
import {UserService} from '../../Services/user.service';


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
  msgs: Message[] = [];
  uploadedFiles: any[] = [];
  image ;
  value: number = 0;
  constructor(
    private userService: UserService,

    private formBuilder: FormBuilder,
    private messageService: MessageService) {
      this.userFormGroup = this.formBuilder.group({
        username: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        address: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        description: ['', Validators.required],
        email: ['', [ Validators.required, Validators.email]]
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
        description : this.user.description,
        city : this.user.city,
        firstName : this.user.firstName,
        lastName : this.user.lastName,
        postalCode : this.user.postalCode,
        address : this.user.address

      })
    });
  }
  updateUser() {

    let {username,email,description,city,firstName,lastName,postalCode,address} = this.userFormGroup.value;
    let data = {
      username,email,description,city,firstName,lastName,postalCode,address
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

readThis(inputValue: any): void {
  var file:File = inputValue;
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.updateImage(myReader.result);

  }
  myReader.readAsDataURL(file);
}
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
}
}




