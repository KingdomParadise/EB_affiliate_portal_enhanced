import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-explore-campaigns',
  templateUrl: './explore-campaigns.component.html',
  styleUrls: ['./explore-campaigns.component.css']
})
export class ExploreCampaignsComponent implements OnInit {
  apiData:any;
  constructor(
    private dataService: InitialDataService,
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
}
