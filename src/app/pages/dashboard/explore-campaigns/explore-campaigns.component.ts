import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-explore-campaigns',
  templateUrl: './explore-campaigns.component.html',
  styleUrls: ['./explore-campaigns.component.css']
})
export class ExploreCampaignsComponent implements OnInit {
  apiData: any;
  showCopyState: boolean = false;
  copyIndex: number;
  isScrolled:boolean = false;
  constructor(
    private dataService: InitialDataService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
  ) { }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    if(window.scrollY > 200){
      this.isScrolled = true
    }else{
      this.isScrolled = false
    }
  }
  ngOnInit(): void {
    this.initalCall();
  }
  initalCall() {
    let req = {
      searchString: ["Mercedes Benz", "BMW", "AUDI"]
    }

    this.dataService.exploreCampaign(req).subscribe((res) => {
      this.apiData = res.response;
      console.log(res);
    });
  }
  filterData(val: any) {
    let req = {
      searchString: [val]
    }

    this.dataService.exploreCampaign(req).subscribe((res) => {
      this.apiData = res.response;
    });
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
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: campaign,
      disableClose: false
    });
    dialogRef1.afterClosed().subscribe(result => {
    });
  }
  copyLink(ev: any, campaign: any, index: number) {
    this.clipboard.copy(campaign.shortUrlLink);
    campaign.toggle = !campaign.toggle;
    setTimeout(() => { campaign.toggle = !campaign.toggle;}, 1500)
    ev.stopPropagation();
  }
}
