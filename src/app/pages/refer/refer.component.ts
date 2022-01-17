import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css']
})
export class ReferComponent implements OnInit {
  referForm: FormGroup
  alertMsg: any = {
    type: '',
    message: ''
  };
  showCopyState = false;
  emails: any;
  referalReward: any;
  referalCode: any;
  emailPattern = "[a-zA-Z0-9_.+-,;]+@(?:(?:[a-zA-Z0-9-]+\.,;)?[a-zA-Z]+\.,;)?(gmail)\.com";

  constructor(
    private dataService: InitialDataService,
    private clipboard: Clipboard,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.referalCode = localStorage.getItem('referalCode');
    this.referalReward = localStorage.getItem('referalReward');
    this.referForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.pattern(/^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/)]
      ],
      description: ['']
    });
  }

  close() {
    this.alertMsg.message = '';
  }
  sendInvitation() {
    if(confirm('Ready to send the email?')){
      this.spinner.show();
      let req = {
        emailId: this.referForm.value.email.split(','),
        description: this.referForm.value.description
      }
      this.dataService.referFriends(req).subscribe(res => {
        if (res.responseCode == 0) {

          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
        }
        this.spinner.hide();
      });
    }
  }
  copyCode() {
    this.clipboard.copy(this.referalCode);
    this.showCopyState = true;
    setTimeout(() => { this.showCopyState = false; }, 1000)
  }
}
