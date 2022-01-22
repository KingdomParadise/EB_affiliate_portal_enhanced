import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore-dealers',
  templateUrl: './explore-dealers.component.html',
  styleUrls: ['./explore-dealers.component.css']
})
export class ExploreDealersComponent implements OnInit {
  filterType = [
    {
      name: 'Alphabatical: Dealer Name',
      value: 'alpha'
    }
  ]
  selectedFilter = this.filterType[0].value;
  constructor() { }

  ngOnInit(): void {
  }

}
