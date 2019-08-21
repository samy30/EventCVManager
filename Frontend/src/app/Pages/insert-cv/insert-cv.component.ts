import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CVService} from '../../Services/cv.service';

@Component({
  selector: 'app-insert-cv',
  templateUrl: './insert-cv.component.html',
  styleUrls: ['./insert-cv.component.scss']
})
export class InsertCVComponent implements OnInit {
  items;
  checkoutForm;

  constructor(
    private cvService: CVService,
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      photo: 'test'
    });
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.cvService.postCV(customerData).subscribe(data => {
      this.fetchData()
    });
  }

  fetchData() {
    this.cvService.getCVs().subscribe(data => {
      this.items = data;
      console.log(this.items);
    });
  }

  ngOnInit() {
    this.fetchData();
  }

}
