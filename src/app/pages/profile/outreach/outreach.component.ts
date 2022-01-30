import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LegendPosition } from '@swimlane/ngx-charts';
import { InitialDataService } from 'src/app/services/initial-data.service';

let totalEngagementGraph: any[] = [
  {
    name: 'Total Engagement',
    series: [],
  },
];
let totalLeadsGraph: any[] = [
  {
    name: 'Total Leads',
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
  userData: any;
  totalEngagementGraph: any[];
  totalLeadsGraph: any[];
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  below = LegendPosition.Below;
  xAxisLabel: string = 'Dates';
  yAxisLabel: string = 'Count';
  lineChartData: any[] = [];
  lineChartData1:any[] = [];
  dateTypes = [
    {
      name: 'Last 7 Days',
      value: 'last7Days',
    },
    {
      name: 'Last Month',
      value: 'lastMonth',
    },

    {
      name: 'All Time',
      value: 'allTime',
    },
    {
      name: 'Today',
      value: 'today',
    },
    {
      name: 'This Year',
      value: 'thisYear',
    },
  ];

  selectedDateRange = this.dateTypes[2].value;
  campaignEngagementGraph: any[] = [];
  constructor(
    private dataService: InitialDataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.callAPI('allTime');

  }
  callAPI(filter:string){
    let req = {
      engagementPeriod: filter,
    };
    this.dataService.getOutReach(req).subscribe((res) => {
      this.apiData = res.response;

      this.dataService.activeLinks.next(this.apiData.activeLinks);
      totalEngagementGraph = [
        {
          name: 'Total Engagement',
          series: [],
        },
      ];
      this.lineChartData = [];
      for (let i = 0; i < this.apiData?.allEngagement?.graphData.length; i++) {
        let obj = {
          name: this.datePipe.transform(
            this.apiData.allEngagement.graphData[i].date,
            'mediumDate'
          ),
          value: this.apiData.allEngagement.graphData[i].count,
        };
        this.lineChartData.push(obj);
      }
      //this.lineChartData = [...this.lineChartData]
      totalEngagementGraph[0]['series'] = [...this.lineChartData];
      console.log(totalEngagementGraph);
      Object.assign(this, { totalEngagementGraph });

      //banner engagement donut graph
      if (this.apiData?.campaignEngagement?.graphData.length > 0) {
        let arr = [
          {
            name: this.apiData?.campaignEngagement.graphData[0].graphName,
            value: this.apiData?.campaignEngagement.graphData[0].count,
          },
          {
            name: this.apiData?.campaignEngagement.graphData[1].graphName,
            value: this.apiData?.campaignEngagement.graphData[1].count,
          },
          {
            name: this.apiData?.campaignEngagement.graphData[2].graphName,
            value: this.apiData?.campaignEngagement.graphData[2].count,
          },
        ];
        this.campaignEngagementGraph = [...this.campaignEngagementGraph, ...arr];
      }

      //leads chart
      totalLeadsGraph = [
        {
          name: 'Total Leads',
          series: [],
        },
      ];
      this.lineChartData1 = [];
      for (let i = 0; i < this.apiData?.leadEngagement?.graphData.length; i++) {
        let obj = {
          name: this.datePipe.transform(
            this.apiData.leadEngagement.graphData[i].date,
            'mediumDate'
          ),
          value: this.apiData.leadEngagement.graphData[i].count,
        };
        this.lineChartData1.push(obj);
      }
      totalLeadsGraph[0]['series'] = this.lineChartData1;
      Object.assign(this, { totalLeadsGraph });
    });
  }
}
