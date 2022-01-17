import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  date = new Date();
  activeTab: number = 0;
  startDate: any;
  endDate: any;
  days: number = 7;
  apiData: any;
  @ViewChild('myDrop') myDrop: NgbDropdown;
  constructor(
    private dataService: InitialDataService,
  ) { }

  ngOnInit(): void {
    this.getAffiliateWalletData('days');
  }

  getAffiliateWalletData(prop: string, days?:number) {
    let req;
    if (prop == 'range') {
      req = {
        filter: "range",
        rangeFrom: this.startDate,
        rangeTo: this.endDate
      }
    } else if (prop == 'days') {
      if(days == 7){
        req = {
          filter: 'days',
          totalDays: 7,
        }
      }else if(days == 14){
        req = {
          filter: 'days',
          totalDays: 14,
        }
      }
      
    } else if (prop == 'month') {
      req = {
        filter: 'month',
      }
    } else if (prop == 'year') {
      req = {
        filter: 'year',
      }
    }

    this.dataService.affililateWallet(req).subscribe(res => {
      this.apiData = res.response;
    })
    this.myDrop?.close();
  }
  onTabClick(num: number) {
    this.activeTab = num;
  }
}
