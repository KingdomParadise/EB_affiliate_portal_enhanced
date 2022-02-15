import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  transactionForm1: FormGroup;
  transactionForm2: FormGroup;
  isLoading:boolean = false;
  //withdrawalAmount = 0;
  alertMsg: any = {
    type: '',
    message: ''
  };
  walletAmount = 0;
  selectedIndex = 0;
  isEditable:boolean = true;
  constructor(
    public dialog: MatDialog,
    public _fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.walletAmount = this.data;
    this.transactionForm1 = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      accountNumber: ['', Validators.required],
      routingNumber: ['', Validators.required],
      ssn: ['', Validators.required]
    })
    this.transactionForm2 = this._fb.group({
      withdrawalAmount: ['', Validators.required],
    })
  }

  close() {
    this.alertMsg.message = '';
  }
  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  closeModal(){
    this.dialog.closeAll();
  }
  submit() {
    this.spinner.show();
    let payload = {
      ...this.transactionForm1.value,
      ...this.transactionForm2.value
    }
    this.dataService.affiliatePayment(payload).subscribe(res => {
      if (res.responseCode == 0) {
        
      } else {
        this.alertMsg.type = "danger";
        this.alertMsg.message = res.errorMsg;

      }
      this.spinner.hide();
    })
  }

}
