import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  apiData: any;
  userData: any;
  showCopyState:boolean = false;

  constructor(
    private dataService: InitialDataService,
    // private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getNotifications().subscribe(res =>{
      this.apiData = res.response;

    })
  }

}

