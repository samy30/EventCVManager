import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/jobOffer/jobs/count';

@Injectable({
  providedIn: 'root'
})

export class StatisticService {

 
  constructor(private http:HttpClient) { }
   
  getJobStatistic(id):Observable<any>{
     return  this.http.get(`${apiUrl}/${id}`,httpOptions);
  }

}
