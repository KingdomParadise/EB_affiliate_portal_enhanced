import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  transactionForm: FormGroup;
  withdrawalAmount = 0;
  alertMsg: any = {
    type: '',
    message: ''
  };
  walletAmount = 0;
  selectedIndex = 0;
  constructor(
    public dialog: MatDialog,
    public _fb: FormBuilder,
    private dataService: InitialDataService,
    @Optional() public dialogRef: MatDialogRef<AccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.walletAmount = this.data;
    this.transactionForm = this._fb.group({
      firstName: [],
      lastName: [],
      dob: [],
      accountNumber: [],
      routingNumber: []
    })
  }

  close() {
    this.alertMsg.message = '';
  }
  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  submit() {
    this.transactionForm.value.withdrawalAmount = this.withdrawalAmount;
    console.log(this.transactionForm.value);
    this.dataService.affiliatePayment(this.transactionForm.value).subscribe(res => {
      if (res.responseCode == 0) {

      } else {
        this.alertMsg.type = "danger";
        this.alertMsg.message = res.errorMsg;

      }
    })
  }

}
