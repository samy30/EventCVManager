import Entreprise from './entreprise';
import User from './user';
import { Cv } from './cv';
export default class JobDemande{
   id:number;
   entreprise:Entreprise;
   user:User;
   cv:Cv;
}