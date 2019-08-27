import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Form } from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { PosteService } from 'src/app/Services/poste.service';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.scss']
})
export class JobSearchComponent implements OnInit {
  PostesForm:FormGroup;
  constructor(private formBuilder: FormBuilder,
               private router:Router,
               private route:ActivatedRoute,
               private posteService:PosteService
              ) { }
  postList = [];
  postes:FormArray;
  ngOnInit() {
     this.loadPosts();
      this.PostesForm=this.formBuilder.group({  
         postes:new FormArray(this.createPosts())
       })
       
    }

    loadPosts(){
        this.posteService.getPostes().subscribe(postes=>{
             this.postList=postes;
        })
      }

      createPosts(){//to transform postlist to formarray
        const formControls = this.postList.map(control => new FormControl(false));
        return formControls;
      }


     selectedPostes:any[]=[];
      arr:any[]=[];
      onSubmit(){
        console.log(this.PostesForm.value.postes);
       var arr=this.PostesForm.value.postes;
       this.selectedPostes=[];
        arr.forEach((element,index) => {
             if(element){
              var p={
                   id:this.postList[index].id,
                   poste:this.postList[index].poste
                  }
               this.selectedPostes.push(p);
             }
        });
        console.log(this.selectedPostes);
        //emit selectedPostes to CVComponent through posteservice using subject
        this.posteService.sendPosts(this.selectedPostes);
        this.router.navigate(['joboffer'],{relativeTo: this.route});
      }

}
