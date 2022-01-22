import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwiperComponent } from 'ngx-useful-swiper';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { SwiperOptions } from 'swiper';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { FacebookService, InitParams } from 'ngx-facebook';
import { Router } from '@angular/router';
export interface PeriodicElement {
  duration: string;
  title: string;
  created_by: string;
  image: string;
  action: any
}
let single:any[] = []

const ELEMENT_DATA: PeriodicElement[] = [
  { duration: "23 sep 2021 - 27 sep 2021", title: 'Henson Nation', created_by: 'Brand Auto Dealer', image: 'https://picsum.photos/100', action: '' },

];
let single2:any[]  = [];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alertMsg: any = {
    type: '',
    message: ''
  };


  apiData: any;

  constructor(
    private dataService: InitialDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  close() {
    this.alertMsg.message = '';
  }

  getPage(page: any) {

  }
}
