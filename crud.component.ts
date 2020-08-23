import { Component, OnInit } from '@angular/core';
import {NepService} from '../nep.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
newquestions;
addnewques={"ref":"","desc":""};
addnewsection={"topicId":"","topicName":""};
editable=true;
constructor(private nepservice:NepService) { }
 
  ngOnInit(): void {
    this.nepservice.get_surveys().subscribe(resp=>this.newquestions=resp);
  }
  enable(){
    this.editable=false;
  }
  editques(topic_id,data){
    console.log(data)
    this.nepservice.edit_question(topic_id,data).subscribe(resp=>console.log(resp));
    location.reload();
  }
  addques(topic_id){
    this.nepservice.add_question(topic_id,this.addnewques).subscribe(resp=>console.log(resp));
    location.reload();
  }
  delques(topic_id,ref){  
    this.nepservice.delete_question(topic_id,ref).subscribe(resp=>console.log(resp));
    location.reload();
  }
  delsection(topic_id){
    this.nepservice.delete_section(topic_id).subscribe(resp=>console.log(resp));
    location.reload();
  }
  addsection(){
    this.nepservice.add_section(this.addnewsection).subscribe(resp=>console.log(resp));
    location.reload();
  }
}
