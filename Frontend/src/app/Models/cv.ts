import Experience_professionnelle from './experience_professionnelle';
import Interest from './interest';
import Language from './language';
import Software from './software';
import Study from './study';
export class Cv{
    firstname:string;
    lastname:string;
    address:string;
    phone:string;
    email:string;
    photo:string;
    experience_professionnelle:Experience_professionnelle[];
    interests:Interest[];
    languages:Language[];
    softwares:Software[];
    studies:Study[];

}