import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private dataService: InitialDataService,
    private router: Router
  ) {
   }

  ngOnInit(): void {
    this.initalCall();
  }

  initalCall(){
    let req ={
      searchString :["Mercedes Benz","BMW","AUDI"]
    }

    this.dataService.exploreDealer(req).subscribe((res) => {
      this.apiData = res.response;
      console.log(res);
    });
  }
  navigateToDealer(dealer:any){
    this.router.navigateByUrl('dashboard/dealer-details', { state: { id: dealer.dealerId } });
  }
  sendAffiliateRequest(dealerId:any){
    let req ={
      dealerId: dealerId,
      affiliateId: (JSON.parse(localStorage.getItem('userData') || '{}')).affiliateId
    }
    this.dataService.sendAffiliateRequest(req).subscribe( res =>{
      console.log(res);
      this.initalCall();
    })
  }
  filterData(val:any){
    let req ={
      searchString : [val]
    }

    this.dataService.exploreDealer(req).subscribe((res) => {
      this.apiData = res.response;
    });
  }

}
