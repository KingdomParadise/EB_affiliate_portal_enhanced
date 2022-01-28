import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-explore-campaigns',
  templateUrl: './explore-campaigns.component.html',
  styleUrls: ['./explore-campaigns.component.css']
})
export class ExploreCampaignsComponent implements OnInit {
  apiData:any;
  constructor(
    private dataService: InitialDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initalCall();
  }
  initalCall(){
    let req ={
      searchString :["Mercedes Benz","BMW","AUDI"]
    }

    this.dataService.exploreCampaign(req).subscribe((res) => {
      this.apiData = res.response;
      console.log(res);
    });
  }
  filterData(val:any){

  }
  openCampaignShareModal(campaign: any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['595px', '450px'];
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
      //this.getdashboardData();
      //this.initalCall();
    });
  }
}
