import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

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

  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.otpForm = this._formBuilder.group({
      otpNumber: [1111, Validators.required]
    });
  }
  close() {
    this.alertMsg.message = ''
  }
  onSubmit() {
    if (this.otpForm.valid) {
      this.otpForm.value.affiliateId = Number(localStorage.getItem('affiliateId'));
      this.dataService.validateOtp(this.otpForm.value).subscribe(res => {
        if (res.responseCode == 0) {
          localStorage.setItem('affiliateId', res.response.affiliateId);
          this.router.navigateByUrl('/dashboard');
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
      });
    }
    //this.router.navigateByUrl('/review');
  }
}
