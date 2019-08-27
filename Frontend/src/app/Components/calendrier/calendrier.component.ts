import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import{Entretien} from 'src/app/Models/Entretien';


var Entretiens: Entretien[] = [
  {id: 1,entreprise:'headIt', candidat: 'Tawfik', poste:"dev", debut: '08',fin:'08:30'},
  {id: 2,entreprise:'LineData', candidat: 'Sami', poste:"graphic des", debut: '08:30',fin:'09'},
  {id: 3,entreprise:'Insat', candidat: 'Mahmoud', poste:"programmer", debut: '08:30',fin:'09'},  
  {id: 4,entreprise:'Formdata', candidat: 'Ali', poste:"cp", debut: '09',fin:'09:30'},
  {id: 5,entreprise:'peaksource', candidat: 'Bassem', poste:"dev", debut: '09',fin:'09:30'},
];

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})



export class CalendrierComponent  {
  
  constructor() { }

  ngOnInit() {
    this.loadEntretiens();
  }
  displayedColumns: string[] = ['id', 'entreprise', 'candidat', 'poste','debut','fin'];
  dataSource = new MatTableDataSource(Entretiens);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadEntretiens(){
   // this.Entretiens=this.
  }
}
