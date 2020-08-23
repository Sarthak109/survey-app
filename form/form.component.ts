import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
// import {Http, Response, Headers, RequestOptions} from "@angular/http";
import{SurveyService} from 'src/app/survey.service'
import {FormDetails,Answers} from 'src/app/shared/form-details.model'
import { NepService } from '../nep.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  survey;
  // survey:Survey[]=[];
  constructor(private surveyservice:SurveyService, private nepservice:NepService) {
    this.nepservice.get_surveys().subscribe(resp=>this.survey=resp);
   }
  
  oneForm:FormDetails={};
  ngOnInit() {
  }

  section1:string[]=["Satisfactory","Needs Revamp","New Program to be Implemented"]
  section2:string[]=["Administrative","Pedagogical","Other"]
  section3:string[]=["Short Term","Long Term"]

  contForm = new FormGroup({
      name: new FormControl(''/*,[Validators.required,Validators.minLength(5)]*/),
      mobile: new FormControl(''/*,[Validators.required,,Validators.minLength(10)]*/),
      email: new FormControl(''/*,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]*/),
      org: new FormControl(''/*,[Validators.required]*/),
      resp: new FormControl(''/*,[Validators.required]*/),
      //choices: new FormArray([]),
      textOther:new FormControl('')
    });

  // isSubmitted=false;
  survey_to_post={'surveys':this.oneForm};
  reset=true;
  onSubmit() {
    // console.log(this.contForm.value);
    this.oneForm.name=this.contForm.controls['name'].value;
    this.oneForm.mobile=this.contForm.controls['mobile'].value;
    this.oneForm.email=this.contForm.controls['email'].value;
    this.oneForm.org=this.contForm.controls['org'].value;
    this.oneForm.resp=this.contForm.controls['resp'].value;
    this.oneForm.answers=this.answers;

    this.contForm.reset();
    this.survey_to_post={'surveys':this.oneForm};
    console.log(JSON.parse(JSON.stringify(this.oneForm)));
    // console.log(this.oneForm);
    this.surveyservice.add_survey(this.oneForm).subscribe(resp=>{console.log(resp)});
    location.reload();
  }
  enable:boolean[]=[];
  answers:Answers[]=[];
  oneAns:Answers;
  // surveys:any={'surveys':this.oneForm};
  onCheckChange(event,id,idx,ref,section) {
    var found=0;
    if(event.target.value=="Other"){
      this.enable[idx]=true;
    }
    var value=event.target.value;
    if(value=="Other"){
      value="Other"+" " +this.contForm.controls['textOther'].value;
    }
    if(this.answers.length!=0){
      for(let ans of this.answers){
        if(ans.ref==ref && ans.section==section){
          ans.choice=value;
          found=1;
          break;
        }
      }
    }
    if(found==0)
      this.answers.push({topicId:this.survey[id].topicId,ref:ref,section:section,choice:value});

    // console.log(this.answers);
  }
}
