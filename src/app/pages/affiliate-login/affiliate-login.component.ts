import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-affiliate-login',
  templateUrl: './affiliate-login.component.html',
  styleUrls: ['./affiliate-login.component.css']
})
export class AffiliateLoginComponent implements OnInit, OnDestroy {
  login: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  hide = true;
  subscription1: Subscription;
  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.login = this._formBuilder.group({
      userName: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$'
          ),
        ],
      ],
    });

    this.subscription1 = this.authService.authState.subscribe((user) => {
      console.log(user);
      let req;
      if (user.provider == 'FACEBOOK') {
        req = {
          loginType: 'facebook',
          socialLoginId: user.id,
          userName: user.email
        }
      } else if (user.provider == 'GOOGLE') {
        req = {
          loginType: 'google',
          socialLoginId: user.id,
          userName: user.email
        }
      }
      this.dataService.login(req).subscribe(res => {
        if (res.responseCode == 0) {
          localStorage.setItem('affiliateId', res.response.affiliateId);
          if(res.response.firstTimeLogin == 1){
            this.router.navigateByUrl('/', {state: { affiliateId: res.response.affiliateId, page:'login' }});
          }else if(res.response.firstTimeLogin == 0){
            if (res.response.phoneVerified == 0) {
              this.router.navigateByUrl('/verify', { state: { affiliateId: res.response.affiliateId } });
            } else {
              localStorage.setItem('token', res.response.token);
              localStorage.setItem('referalCode', res.response.referalCode);
              localStorage.setItem('referalReward', res.response.referalReward);
              localStorage.setItem('userData', JSON.stringify(res.response));
              this.dataService.totalPoints.next(res.response.totalPoints);
              this.dataService.userData.next(res.response);
              this.router.navigateByUrl('/dashboard/explore-dealers', { state: { affiliateId: res.response.affiliateId } });
            }
          }

          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
        }
        else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      })
    });

  }
  get f1() {
    return this.login.controls;
  }
  submit() {
    if (this.login.valid) {
      this.login.value.loginType = 'local';
      this.dataService.login(this.login.value).subscribe(res => {
        if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else if (res.responseCode == 0) {
          if (res.response.phoneVerified == 0) {
            localStorage.setItem('affiliateId', res.response.affiliateId);
            console.log("navigate goes to varify");
            //this.router.navigateByUrl('/verify');
             this.router.navigateByUrl('/verify');
          } else {
            localStorage.setItem('token', res.response.token);
            localStorage.setItem('referalCode', res.response.referalCode);
            localStorage.setItem('referalReward', res.response.referalReward);
            localStorage.setItem('userData', JSON.stringify(res.response));
            this.dataService.userData.next(res.response);
            this.dataService.totalPoints.next(res.response.totalPoints);
            this.router.navigateByUrl('/dashboard/explore-dealers', { state: { affiliateId: res.response.affiliateId } });
          }
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      })
    }
  }
  logInWithFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  close() {
    this.alertMsg.message = ''
  }
  ngOnDestroy(): void {
      this.subscription1.unsubscribe();
  }
}
