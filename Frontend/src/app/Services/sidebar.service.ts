import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { of } from 'rxjs';
import Menu from "../Models/menu";
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menu = [
    {id:1, title: 'dashboard'},
    {id:2, title: 'Profil'},
    {id:3, title: 'CreationCV'},
    {id:4, title: 'JobSearch'}
  ]
  constructor() { }
  getMenus(criteria): Observable<Menu[]> {
    return of(this.menu);
  }

}
