import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl, Form, Validators} from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { PosteService } from 'src/app/Services/poste.service';
import {JobsService} from '../../Services/jobs.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private posteService: PosteService,
              private jobsService: JobsService
              ) {
    this.PostesForm = this.formBuilder.group({
      choice: ['', Validators.required]
    });
  }
  PostesForm: FormGroup;
  postList = [];
  postes: FormArray;


     selectedPostes: any[] = [];
      arr: any[] = [];
  ngOnInit() {
    this.loadPosts();
  }

    loadPosts() {
        // this.posteService.getPostes().subscribe(postes => {
        //      this.postList = postes;
        //      console.log(this.postList);
        // });
        this.jobsService.getJobs().subscribe(postes => {
          this.postList = postes ;
        });
      }

      createPosts() {// to transform postlist to formarray
        const formControls = this.postList.map(control => new FormControl(false));
        return formControls;
      }
      onSubmit() {
        console.log(this.PostesForm.value.choice);
        /*let arr = this.PostesForm.value.postes;
        this.selectedPostes = [];
        arr.forEach((element, index) => {
             if (element) {
              let p = {
                   id: this.postList[index].id,
                   poste: this.postList[index].poste
                  };
              this.selectedPostes.push(p);
             }
        });
        console.log(this.selectedPostes);*/
        // emit selectedPostes to CVComponent through posteservice using subject
        this.posteService.sendPosts(this.selectedPostes);
        this.router.navigate(['joboffer'], {relativeTo: this.route});
      }

}
