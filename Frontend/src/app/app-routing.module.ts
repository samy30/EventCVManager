import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsertCVComponent } from './Pages/insert-cv/insert-cv.component';
import { HomeComponent } from './Components/home/home.component';
import { CalendrierComponent } from './Components/calendrier/calendrier.component';
import { LoginComponent } from './Components/login/login.component';
import { JobSearchComponent } from './Components/job-search/job-search.component';
import { JobOfferComponent } from './Components/job-offer/job-offer.component';
import { AuthGuard } from './Services/auth.guard';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { QuisommesnousComponent } from './Components/quisommesnous/quisommesnous.component';
import { NotificationComponent } from './Components/notification/notification.component';
import JobDemande from './Models/job-demande';
import { JobDemandeComponent } from './Components/job-demande/job-demande.component';
import { NotificationDetailComponent } from './Components/notification-detail/notification-detail.component';
import { JobDemandeDetailComponent } from './Components/job-demande-detail/job-demande-detail.component';
import { OfferCreationComponent } from './Components/offer-creation/offer-creation.component';
import { AdministrationComponent } from './Components/administration/administration.component';
import { NotreplatformeComponent } from './Components/notreplatforme/notreplatforme.component';
import { ConfirmedJobDemandeComponent } from './Components/confirmed-job-demande/confirmed-job-demande.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';


const routes: Routes = [
  {path:'EmploiTemps',component: CalendrierComponent, canActivate:[AuthGuard],
                 data: { allowedRoles: ['ROLE_ENTERPRISE'] } },
  {path:'Profil',component: ProfilComponent, canActivate:[AuthGuard],
                data: { allowedRoles: ['ROLE_ENTERPRISE','ROLE_USER','ROLE_ADMIN'] }},
                {path:'Login',component: LoginComponent},
  
  {path:'Administration',component: AdministrationComponent,
                data: { allowedRoles: ['ROLE_ENTERPRISE','ROLE_USER'] }},
  {path:'Notification',
       component: NotificationComponent,
       children:[
        {
            path: 'NotificationDetail',
            component: NotificationDetailComponent
        }],
        canActivate:[AuthGuard],
        data: { allowedRoles: ['ROLE_USER'] }
      },
  {path:'JobDemande',component: JobDemandeComponent,
        children:[
         {
            path: 'JobDemandeDetail',
            component: JobDemandeDetailComponent
         }],
        canActivate:[AuthGuard],
        data: { allowedRoles: ['ROLE_ENTERPRISE'] }
   },
   {path:'Signup',component: SignupComponent},
  {     path:'JobSearch',
        component: JobSearchComponent,
        children:[
          {
              path: 'joboffer',
              component: JobOfferComponent
          }],
          canActivate:[AuthGuard],
          data: { allowedRoles: ['ROLE_USER'] }
    }
    ,
    { path: 'QuiSommesNous', component: QuisommesnousComponent },
    { path: 'NotrePlateforme', component: NotreplatformeComponent },
    {path:'ConfirmedJobDemande',component:ConfirmedJobDemandeComponent},
    {path:'mdpChange',component:ChangePasswordComponent},
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
