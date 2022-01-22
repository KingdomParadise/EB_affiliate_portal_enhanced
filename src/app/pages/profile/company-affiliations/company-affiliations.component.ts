import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-company-affiliations',
  templateUrl: './company-affiliations.component.html',
  styleUrls: ['./company-affiliations.component.css']
})
export class CompanyAffiliationsComponent implements OnInit {
  apiData: any;
  userData: any;
  dateTypes = [
    {
      name: 'Last 7 Days',
      value: '7',
    },
    {
      name: 'Last Month',
      value: 'month',
    },

    {
      name: 'All Time',
      value: 'all',
    },
    {
      name: 'Today',
      value: 'today',
    },
    {
      name: 'This Yesr',
      value: 'year',
    },
  ];

  selectedDateRange = this.dateTypes[0].value;
  constructor(
    private dataService: InitialDataService,
    // private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getCompanyAffiliations().subscribe(res =>{
      this.apiData = res.response;

    })
  }

}
