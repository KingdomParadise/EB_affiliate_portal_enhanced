import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-company-affiliations',
  templateUrl: './company-affiliations.component.html',
  styleUrls: ['./company-affiliations.component.css']
})
export class CompanyAffiliationsComponent implements OnInit {
  apiData: any;
  userData: any;
  showCopyState:boolean = false;

  constructor(
    private dataService: InitialDataService,
    private clipboard: Clipboard,
    // private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getCompanyAffiliations().subscribe(res =>{
      this.apiData = res.response;

    })
  }
  copyUrl(url:string) {
    this.clipboard.copy(url);
    this.showCopyState = true;
    setTimeout(() => { this.showCopyState = false; }, 1000)
  }
}
