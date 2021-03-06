import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AffiliateLoginComponent } from './pages/affiliate-login/affiliate-login.component';

import { AffiliateRegistrationComponent } from './pages/affiliate-registration/affiliate-registration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DealerDetailsComponent } from './pages/dashboard/dealer-details/dealer-details.component';
import { ExploreCampaignsComponent } from './pages/dashboard/explore-campaigns/explore-campaigns.component';
import { ExploreDealersComponent } from './pages/dashboard/explore-dealers/explore-dealers.component';
import { EnterEmailComponent } from './pages/enter-email/enter-email.component';
import { EnterPhoneComponent } from './pages/enter-phone/enter-phone.component';
import { FaqComponent } from './pages/faq/faq.component';
import { OtpSentComponent } from './pages/otp-sent/otp-sent.component';
import { CompanyAffiliationsComponent } from './pages/profile/company-affiliations/company-affiliations.component';
import { NotificationsComponent } from './pages/profile/notifications/notifications.component';
import { OutreachComponent } from './pages/profile/outreach/outreach.component';
import { OverviewComponent } from './pages/profile/overview/overview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingComponent } from './pages/profile/setting/setting.component';
import { WalletComponent } from './pages/profile/wallet/wallet.component';
import { ReferComponent } from './pages/refer/refer.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { AuthGuard } from './services/auth.gaurds';


const routes: Routes = [
  {
    path: '',
    component: AffiliateRegistrationComponent,
  },
  {
    path: 'login',
    component: AffiliateLoginComponent,
  },
  {
    path: 'enter-email',
    component: EnterEmailComponent,
  },
  {
    path: 'enter-phone',
    component: EnterPhoneComponent,
  },
  {
    path: 'verify',
    component: VerifyOtpComponent,
  },
  {
    path: 'otp-sent',
    component: OtpSentComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: OverviewComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'overview',
            component: OverviewComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'outreach',
            component: OutreachComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'affiliations',
            component: CompanyAffiliationsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'notifications',
            component: NotificationsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'wallet',
            component: WalletComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'settings',
            component: SettingComponent,
            canActivate: [AuthGuard]
          }

        ]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: ExploreDealersComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'explore-dealers',
            component: ExploreDealersComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'dealer-details',
            component: DealerDetailsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'explore-campaigns',
            component: ExploreCampaignsComponent,
            canActivate: [AuthGuard]
          },
        ]
      },
      {
        path: 'faq',
        component: FaqComponent,
        canActivate: [AuthGuard]
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
