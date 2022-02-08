import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-enter-phone',
  templateUrl: './enter-phone.component.html',
  styleUrls: ['./enter-phone.component.css']
})
export class EnterPhoneComponent implements OnInit {
  login: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  constructor(
    private authService: SocialAuthService,
    private dataService: InitialDataService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.login = this._formBuilder.group({
      phoneNumber: ['', Validators.required],
    });
  }
  submit(){
    this.dataService.forgotPassword(this.login.value).subscribe(res =>{
      console.log(res);
      if(res.responseCode == 0){
        this.router.navigateByUrl('/otp-sent',{ state: { page:'phone', val: this.login.value.phoneNumber }});
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
