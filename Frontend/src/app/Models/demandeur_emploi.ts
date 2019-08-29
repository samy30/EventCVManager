import { Cv } from './cv';

export default class DemandeurEmploi{
     id:number;
     username:string;
    password:string;
    nom:string;
    prenom:string;
    age:number;
    genre:string;
    mail:string;
    listeCV:Cv[];
}