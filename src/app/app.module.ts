import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, Meta } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DefaultModule } from './layouts/default/default.module';
import { NgbAlertModule, NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TokenInterceptor } from './services/tokenInterceptor';
import { AgmCoreModule } from '@agm/core';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AffiliateRegistrationComponent } from './pages/affiliate-registration/affiliate-registration.component';
import { AffiliateLoginComponent } from './pages/affiliate-login/affiliate-login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { FacebookModule } from 'ngx-facebook';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { TrainingComponent } from './pages/training/training.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModalComponent } from './pages/dashboard/share-modal/share-modal.component';
import { ReferComponent } from './pages/refer/refer.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChangePasswordModalComponent } from './pages/settings/change-password-modal/change-password-modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { EnterEmailComponent } from './pages/enter-email/enter-email.component';
import { EnterPhoneComponent } from './pages/enter-phone/enter-phone.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OverviewComponent } from './pages/profile/overview/overview.component';
import { OutreachComponent } from './pages/profile/outreach/outreach.component';
import { CompanyAffiliationsComponent } from './pages/profile/company-affiliations/company-affiliations.component';
import { ExploreDealersComponent } from './pages/dashboard/explore-dealers/explore-dealers.component';
import { DealerDetailsComponent } from './pages/dashboard/dealer-details/dealer-details.component';
import { NotificationsComponent } from './pages/profile/notifications/notifications.component';
import { WalletComponent } from './pages/profile/wallet/wallet.component';

@NgModule({
  declarations: [
    AppComponent,
    AffiliateRegistrationComponent,
    AffiliateLoginComponent,
    DashboardComponent,
    VerifyOtpComponent,
    TrainingComponent,
    ShareModalComponent,
    ReferComponent,
    SettingsComponent,
    ChangePasswordModalComponent,
    EnterEmailComponent,
    EnterPhoneComponent,
    ProfileComponent,
    OverviewComponent,
    OutreachComponent,
    CompanyAffiliationsComponent,
    ExploreDealersComponent,
    DealerDetailsComponent,
    NotificationsComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxUsefulSwiperModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgSelectModule,
    MatTabsModule,
    DefaultModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    NgbAlertModule,
    NgbDropdownModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhWahf8oOXf9UyFu8W_iCE8HChcbgOVbQ',
      libraries: ['places']
    }),
    FacebookModule.forRoot(),
    NgxPaginationModule,
    SocialLoginModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxSpinnerModule,
    NgxChartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Meta,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '810166806223-p8o2r3avq11d8s8n2lsocehnj7j8uejh.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('277274391071647')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
