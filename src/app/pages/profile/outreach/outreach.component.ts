import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InitialDataService } from 'src/app/services/initial-data.service';

let multi: any[] = [
  {
    name: 'Shared',
    series: [],
  },
];

@Component({
  selector: 'app-outreach',
  templateUrl: './outreach.component.html',
  styleUrls: ['./outreach.component.css'],
  providers: [DatePipe],
})
export class OutreachComponent implements OnInit {
  apiData: any;
  multi: any[];
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Count';
  lineChartData: any[] = [];
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
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    let req = {
      engagementPeriod: 'lastMonth',
    };
    this.dataService.getOutReach(req).subscribe((res) => {
      this.apiData = res.response;

      for (let i = 0; i < this.apiData.bannerEngagement.length; i++) {
        let obj = {
          name: this.datePipe.transform(
            this.apiData.contentShared[i].createTs,
            'shortDate'
          ),
          value: this.apiData.contentShared[i].count,
        };
        this.lineChartData.push(obj);
      }
      //console.log(this.lineChartData);
      multi[0]['series'] = this.lineChartData;

      Object.assign(this, { multi });
    });
  }
}
