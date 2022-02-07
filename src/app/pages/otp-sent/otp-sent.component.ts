import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-otp-sent',
  templateUrl: './otp-sent.component.html',
  styleUrls: ['./otp-sent.component.css']
})
export class OtpSentComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private authService: SocialAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  close(){

  }
  logInWithFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  submit(){
    this.router.navigateByUrl('/verify');
  }
}
