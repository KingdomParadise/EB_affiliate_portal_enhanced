import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-explore-dealers',
  templateUrl: './explore-dealers.component.html',
  styleUrls: ['./explore-dealers.component.css']
})
export class ExploreDealersComponent implements OnInit {
  apiData:any;
  filterType = [
    {
      name: 'Alphabatical: Dealer Name',
      value: 'alpha'
    }
  ]
  selectedFilter = this.filterType[0].value;
  constructor(
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    let req ={
      searchString :["Mercedes Benz","BMW","AUDI"]
    }

    this.dataService.exploreDealer(req).subscribe((res) => {
      this.apiData = res.response;
      console.log(res);
    });
  }

}
