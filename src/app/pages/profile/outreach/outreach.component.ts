import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

let single:any[]  = [];
let single2:any[]  = [];
@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html',
  styleUrls: ['./outreach.component.css']
})
export class OutreachComponent implements OnInit {
  apiData: any;
  single: any[];
  single2: any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  yAxisLabel = 'Population';
  constructor(
    private dataService: InitialDataService,
  ) { }

  ngOnInit(): void {
  }

  getInitialData(){
    let req = {
      bannerPage: 0,
      bannerSize: 10,
      campaignPage: 0,
      campaignSize: 10,
      bannerSortBy: "owner",
      campaignSortBy: ""
    }
    this.dataService.getDashboardData(req).subscribe(res => {
      this.apiData = res.response;
      this.single = res.response.bannerEngagement;
      let arr = [];
      for(let i = 0; i< this.apiData.bannerEngagement.length; i++){
        let obj = {
          name: this.apiData.bannerEngagement[i].date,
          value: this.apiData.bannerEngagement[i].count
        }
        arr.push(obj);
      }
      single = arr;
      Object.assign(this, {single})
      let arr2 = []
      for(let i = 0; i< this.apiData.campaignEngagement.length; i++){
        let obj = {
          name: this.apiData.campaignEngagement[i].date,
          value: this.apiData.campaignEngagement[i].count
        }
        arr2.push(obj);
      }
      single2 = arr2;
      Object.assign(this, {single2})
    })
  }
}
