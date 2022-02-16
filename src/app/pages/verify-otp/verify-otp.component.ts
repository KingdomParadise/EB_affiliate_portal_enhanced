import { Component, OnInit, ViewChild } from '@angular/core';
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
  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  alertMsg: any = {
    type: '',
    message: ''
  };
  otp!: number;
  isLoading: boolean = false;
  config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.otpForm = this._formBuilder.group({
      affiliateId: ['', Validators.required],
      otpNumber: ['', Validators.required]
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  resend() {
    let payload = {
      affiliateId: Number(localStorage.getItem('affiliateId'))
    }
    this.dataService.resendOtp(payload).subscribe(res => {
      if (res.responseCode == 0) {
        this.alertMsg.type = 'success';
        this.alertMsg.message = res.successMsg
      }
    })
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }
  onSubmit() {
    this.otpForm.patchValue({
      otpNumber: this.otp,
      affiliateId: localStorage.getItem('affiliateId')
    })
    if (this.otpForm.valid) {
      this.isLoading = true;
      this.dataService.validateOtp({
        otpNumber: this.otpForm.value.otpNumber,
        affiliateId: this.otpForm.value.affiliateId
      }).subscribe(res => {
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
        this.isLoading = false;
      });
    }
    //this.router.navigateByUrl('/review');
  }
  back() {
    this.location.back();
  }
}
