import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute } from '@angular/router';
import {JobsService} from '../../Services/jobs.service';
import { Subscription,timer } from 'rxjs';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
 sub:Subscription;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private jobsService: JobsService
  ) {
    this.PostesForm = this.formBuilder.group({
      choice: ['', Validators.required]
    });
  }
  PostesForm: FormGroup;
  postList = [];

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.jobsService.getJobs().subscribe(postes => {
      this.postList = postes ;
    });
  }

  onSubmit() {
    this.jobsService.sendPosts(this.PostesForm.value.choice);
    this.router.navigate(['joboffer'], {relativeTo: this.route});
  }

}
