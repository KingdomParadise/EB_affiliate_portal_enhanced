import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  otpForm: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  isLoading:boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.otpForm = this._formBuilder.group({
      otpNumber: [1111, Validators.required]
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  resend(){
    let payload ={
      affiliateId: Number(localStorage.getItem('affiliateId'))
    }
    this.dataService.resendOtp(payload).subscribe(res =>{
      if (res.responseCode == 0) {
        this.alertMsg.type = 'success';
        this.alertMsg.message = res.successMsg
      }
    })
  }
  onSubmit() {

    if (this.otpForm.valid) {
      this.isLoading = true;
      this.otpForm.value.affiliateId = Number(localStorage.getItem('affiliateId'));
      this.dataService.validateOtp(this.otpForm.value).subscribe(res => {
        if (res.responseCode == 0) {
          localStorage.setItem('affiliateId', res.response.affiliateId);
          this.router.navigateByUrl('/dashboard/explore-dealers');
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
        this.isLoading =false;
      });
    }
    //this.router.navigateByUrl('/review');
  }
  back(){
    this.location.back();
  }
}
