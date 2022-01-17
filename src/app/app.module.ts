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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
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
import { WalletComponent } from './pages/wallet/wallet.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxChartsModule } from '@swimlane/ngx-charts';

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
    WalletComponent,
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
    MatIconModule,
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
