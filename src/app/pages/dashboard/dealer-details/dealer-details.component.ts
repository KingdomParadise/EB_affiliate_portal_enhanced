import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ShareModalComponent } from '../share-modal/share-modal.component';

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.css']
})
export class DealerDetailsComponent implements OnInit {
  dealer:any;
  constructor(
    private dataService: InitialDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(history.state)
    let dealerId = history.state.id;
    if(dealerId){
      this.dataService.dealerDetails({dealerId: history.state.id}).subscribe(res =>{
        this.dealer = res.response;
        console.log(this.dealer);
      })
    }
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
