import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css']
})
export class EnterEmailComponent implements OnInit {
  login: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
  }
  submit(){

  }
  close(){

  }
  logInWithFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
