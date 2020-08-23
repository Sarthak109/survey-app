import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NepService {
  base= 'http://127.0.0.1:5000'
  constructor(private http:HttpClient) { }

  add_survey(survey){
    return this.http.post<any>(`${this.base}/addsurvey`,survey)
  }
  get_surveys(){
    return this.http.get(`${this.base}/getquestions`)
  }
  edit_question(topic,body){
    return this.http.put(`${this.base}/updatequestion/${topic}`,body)
  }
  add_question(topic,body){
    return this.http.put(`${this.base}/addquestion/${topic}`,body)
  }
  delete_question(topic,ref){
    return this.http.delete(`${this.base}/deletequestion/${topic}/${ref}`)
  }
  delete_section(topic){
    return this.http.delete(`${this.base}/deletesection/${topic}`)
  }
  add_section(body){
    return this.http.post<any>(`${this.base}/addsection`,body)
  }
}