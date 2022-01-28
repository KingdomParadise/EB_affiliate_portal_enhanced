import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  apiData:any;
  userData:any;
  showCopyState:boolean = false;
  constructor(
    private dataService: InitialDataService,
    private clipboard: Clipboard,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getOverview().subscribe(res =>{
      this.apiData = res.response;
      this.dataService.activeLinks.next(this.apiData.activeLinks);
    })
  }

  copyUrl(url:string) {
    this.clipboard.copy(url);
    this.showCopyState = true;
    setTimeout(() => { this.showCopyState = false; }, 1000)
  }
}
