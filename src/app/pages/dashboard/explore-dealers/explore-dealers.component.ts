import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-explore-dealers',
  templateUrl: './explore-dealers.component.html',
  styleUrls: ['./explore-dealers.component.css']
})
export class ExploreDealersComponent implements OnInit {
  apiData: any = null;
  filterType = [
    {
      name: 'Alphabatical: Dealer Name',
      value: 'alpha'
    }
  ]
  selectedFilter = this.filterType[0].value;
  showCopyState: boolean = false;
  copyIndex: number;
  isScrolled:boolean =false;
  constructor(
    private dataService: InitialDataService,
    private router: Router,
    private clipboard: Clipboard,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {

  }
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    if(window.scrollY > 200){
      this.isScrolled = true
    }else{
      this.isScrolled = false
    }
  }
  ngOnInit(): void {
    if (this.apiData === null) {
      this.initalCall();
    }
  }

  initalCall() {
    this.spinner.show();
    let req = {
      searchString: ["Mercedes Benz", "BMW", "AUDI"]
    }

    this.dataService.exploreDealer(req).subscribe((res) => {
      this.apiData = res.response;
      this.spinner.hide();
      console.log(res);
    });
  }
  navigateToDealer(dealer: any) {
    this.router.navigateByUrl('dashboard/dealer-details', { state: { id: dealer.dealerId } });
  }
  sendAffiliateRequest(dealerId: any) {
    let req = {
      dealerId: dealerId,
      affiliateId: (JSON.parse(localStorage.getItem('userData') || '{}')).affiliateId
    }
    this.dataService.sendAffiliateRequest(req).subscribe(res => {
      console.log(res);
      this.initalCall();
    })
  }
  filterData(val: any) {
    let req = {
      searchString: [val]
    }

    this.dataService.exploreDealer(req).subscribe((res) => {
      this.apiData = res.response;
    });
  }
  copyLink(ev: any, link: string, index: number) {
    this.clipboard.copy(link);
    this.showCopyState = true;
    this.copyIndex = index
    setTimeout(() => { this.showCopyState = false; }, 1000)
    ev.stopPropagation();
  }
  openCampaignShareModal(campaign: any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['595px', '500px'];
    } else {
      size = ['350px', '600px'];
    }
    const dialogRef1 = this.dialog.open(ShareModalComponent, {
      maxWidth: size[0],
      height: 'auto',
      width: '100%',
      data: campaign,
      disableClose: false
    });
    dialogRef1.afterClosed().subscribe(result => {
      //this.getdashboardData();
      this.initalCall();
    });
  }
}
