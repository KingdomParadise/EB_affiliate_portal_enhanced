import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  apiData:any;
  userData:any;
  currentPage = 0;
  constructor(
    private dataService: InitialDataService,
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getPoints().subscribe( res =>{
      this.apiData = res.response;
    });
  }

}
