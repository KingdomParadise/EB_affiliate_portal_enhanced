import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { AccountDetailsComponent } from './account-details/account-details.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  apiData:any;
  userData:any;
  currentPage = 0;
  constructor(
    private dataService: InitialDataService,
    private dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getPoints().subscribe( res =>{
      this.apiData = res.response;
    });
  }

  openModal(){
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['695px', '500px'];
    } else {
      size = ['350px', '600px'];
    }
    const dialogRef1 = this.dialog.open(AccountDetailsComponent, {
      maxWidth: size[0],
      height: 'auto',
      width: '100%',
      data: this.apiData?.cashBalance,
      disableClose: false
    });
    dialogRef1.afterClosed().subscribe(result => {
      //this.getdashboardData();
      //this.initalCall();
    });
  }
  
}
