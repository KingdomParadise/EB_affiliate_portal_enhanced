import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatDialog } from '@angular/material/dialog';
import { AccountDetailsComponent } from '../wallet/account-details/account-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  apiData:any;
  userData:any;
  showCopyState:boolean = false;
  copyIndex:number;
  constructor(
    private dataService: InitialDataService,
    private clipboard: Clipboard,
    private dialog:MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getOverview().subscribe(res =>{
      this.apiData = res.response;
      this.dataService.activeLinks.next(this.apiData.activeLinks);
      this.dataService.totalPoints.next(res.response.points);
    })
  }

  copyUrl(url:string, i:number) {
    this.clipboard.copy(url);
    this.showCopyState = true;
    this.copyIndex = i;
    setTimeout(() => { this.showCopyState = false; }, 1000)
  }

  // openWalletModal(){
  //   let size = ['675px', '475px'];
  //   if (window.innerWidth > 786) {
  //     size = ['695px', '500px'];
  //   } else {
  //     size = ['350px', '600px'];
  //   }
  //   const dialogRef1 = this.dialog.open(AccountDetailsComponent, {
  //     maxWidth: size[0],
  //     height: 'auto',
  //     width: '100%',
  //     data: this.apiData?.cashBalance,
  //     disableClose: false
  //   });
  //   dialogRef1.afterClosed().subscribe(result => {
  //     //this.getdashboardData();
  //     //this.initalCall();
  //   });
  // }
  goToWallet(){
    this.router.navigateByUrl('/profile/wallet')
  }

}
