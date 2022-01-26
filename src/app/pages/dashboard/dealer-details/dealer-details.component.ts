import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-dealer-details',
  templateUrl: './dealer-details.component.html',
  styleUrls: ['./dealer-details.component.css']
})
export class DealerDetailsComponent implements OnInit {
  dealer:any;
  constructor(
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    console.log(history.state)
    let dealerId = history.state.id;
    if(dealerId){
      this.dataService.dealerDetails({dealerId: history.state.id}).subscribe(res =>{
        this.dealer = res.response;
        console.log(this.dealer);
      })
    }
  }


}
