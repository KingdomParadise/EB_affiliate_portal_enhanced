import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-affiliations',
  templateUrl: './company-affiliations.component.html',
  styleUrls: ['./company-affiliations.component.css']
})
export class CompanyAffiliationsComponent implements OnInit {
  apiData: any;
  userData: any;
  showCopyState: boolean = false;
  copyIndex: number = 0;
  constructor(
    private dataService: InitialDataService,
    private clipboard: Clipboard,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getCompanyAffiliations().subscribe(res => {
      this.apiData = res.response;
      this.dataService.activeLinks.next(this.apiData.activeLinks);
    })
  }
  copyUrl(url: string, i: number) {
    this.clipboard.copy(url);
    this.showCopyState = true;
    this.copyIndex = i;
    setTimeout(() => { this.showCopyState = false; }, 1000)
  }

  goToDealerDetails(id: any) {
    this.router.navigateByUrl('dashboard/dealer-details', { state: { id: id } });
  }
}
