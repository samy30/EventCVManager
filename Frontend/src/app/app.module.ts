import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InsertCVComponent } from './Pages/insert-cv/insert-cv.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule} from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material';
import { HomeComponent } from './Components/home/home.component';
import { CalendrierComponent } from './Components/calendrier/calendrier.component';
import { LoginComponent } from './Components/login/login.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { JobSearchComponent } from './Components/job-search/job-search.component';
import { JobOfferComponent } from './Components/job-offer/job-offer.component';
import { TokenInterceptor } from './http-interceptors/token-Interceptor ';
import { httpInterceptorProviders } from './http-interceptors';
import { AuthGuard } from './Services/auth.guard';
import { AuthService } from './Services/auth.service';
import { SignupComponent } from './Components/signup/signup.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { JobDemandeComponent } from './Components/job-demande/job-demande.component';
import { NotificationDetailComponent } from './Components/notification-detail/notification-detail.component';
import { JobDemandeDetailComponent } from './Components/job-demande-detail/job-demande-detail.component';
import { OfferCreationComponent } from './Components/offer-creation/offer-creation.component';
import {UserService} from './Services/user.service';
import { AdministrationComponent } from './Components/administration/administration.component';
import { CvDisplayComponent } from './Components/cv-display/cv-display.component';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireMessagingModule} from '@angular/fire/messaging';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {MessagingService} from './Services/messaging.service';
import {AsyncPipe} from '@angular/common';
import { JobListingComponent } from './Components/job/job-listing/job-listing.component';
import { EnterpriseListingComponent } from './Components/enterprise/enterprise-listing/enterprise-listing.component';
import { EnterpriseEditionComponent } from './Components/enterprise/enterprise-edition/enterprise-edition.component';
import { EnterpriseCreationComponent } from './Components/enterprise/enterprise-creation/enterprise-creation.component';
import { JobOfferListingComponent } from './Components/job-offer-listing/job-offer-listing.component';
import { StatistiqueComponent } from './Components/statistique/statistique.component';
import { ChartsModule } from 'ng2-charts';
import { JobOfferEditionComponent } from './Components/job-offer-edition/job-offer-edition.component';
import {FooterComponent} from './Components/footer/footer.component';
import {CarouselComponent} from './Components/carousel/carousel.component';
import {NotifierModule} from 'angular-notifier';
import {NotreplatformeComponent} from './Components/notreplatforme/notreplatforme.component';
import {QuisommesnousComponent} from './Components/quisommesnous/quisommesnous.component';
import { ConfirmedJobDemandeComponent } from './Components/confirmed-job-demande/confirmed-job-demande.component';
import { UploadComponent } from './Components/upload/upload.component';
import {Carousel2Component} from './Components/carousel2/carousel2.component';


@NgModule({
  declarations: [
    AppComponent,
    InsertCVComponent,
    SidebarComponent,
    HomeComponent,
    CalendrierComponent,
    LoginComponent,
    JobSearchComponent,
    JobOfferComponent,
    SignupComponent,
    ProfilComponent,
    NotificationComponent,
    JobDemandeComponent,
    NotificationDetailComponent,
    JobDemandeDetailComponent,
    OfferCreationComponent,
    AdministrationComponent,
    CvDisplayComponent,
    EnterpriseListingComponent,
    EnterpriseEditionComponent,
    EnterpriseCreationComponent,
    JobOfferListingComponent,
    StatistiqueComponent,
    JobOfferEditionComponent,
    JobListingComponent,
    FooterComponent,
    CarouselComponent,
    NotreplatformeComponent,
    QuisommesnousComponent,
    ConfirmedJobDemandeComponent,
    UploadComponent,
    Carousel2Component
  ],
  imports: [
    ChartsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    ProgressBarModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NotifierModule.withConfig( {
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      }
    } )
  ],
  entryComponents: [InsertCVComponent, EnterpriseCreationComponent,
                    OfferCreationComponent, EnterpriseEditionComponent,
                    JobOfferEditionComponent],
  providers: [
    httpInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthGuard,
    AuthService,
    UserService,
    MessagingService,
    AsyncPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
