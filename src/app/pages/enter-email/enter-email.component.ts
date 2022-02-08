import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { InitialDataService } from 'src/app/services/initial-data.service';

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
    private authService: SocialAuthService,
    private _formBuilder: FormBuilder,
    private router: Router,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.login = this._formBuilder.group({
      emailId: ['', Validators.required],
    });
  }
  submit(){
    this.dataService.forgotPassword(this.login.value).subscribe(res =>{
      console.log(res);
      if(res.responseCode == 0){
        this.router.navigateByUrl('/otp-sent',{ state: { page:'email', val: this.login.value.emailId }});
      }else{
        this.alertMsg.type= 'danger';
        this.alertMsg.message = res.errorMsg
      }
    });
    
  }
  close(){
    this.alertMsg.message ='';
  }
  logInWithFb() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
