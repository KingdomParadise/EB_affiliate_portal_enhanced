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
  p: number = 1;
  p1: number;
  alertMsg: any = {
    type: '',
    message: ''
  };
  slides = [
    { image: 'assets/images/banner1.png' },
    { image: 'assets/images/banner1.png' }
  ];
  displayedColumns: string[] = ['duration', 'title', 'created_by', 'image', 'action'];
  dataSource = ELEMENT_DATA;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination1', clickable: true },

    observer: true,
    observeParents: true,
    parallax: true,
    spaceBetween: 30
  };
  config1: SwiperOptions = {
    pagination: { el: '.swiper-pagination2', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    // autoplay: {
    //   delay: 6000,
    //   disableOnInteraction: true
    // },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 30
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      400: {
        slidesPerView: 1
      },
      300: {
        slidesPerView: 1
      }
    },

  };
  apiData: any;
  @ViewChild('pagination1') pagination1: ElementRef;
  // @ViewChild('pagination2') pagination2: ElementRef;
  //@ViewChild('usefulSwiper1',{static: false}) usefulSwiper1: any;
  //graph vars
  single: any[];
  single2: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#ddb4d9', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  constructor(
    private dataService: InitialDataService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInitialData();
    setInterval(()=>{ 
      this.setBanner();
    }, 3000);
  }
  getInitialData(){
    let req = {
      bannerPage: 0,
      bannerSize: 10,
      campaignPage: 0,
      campaignSize: 10,
      bannerSortBy: "owner",
      campaignSortBy: ""
    }
    this.dataService.getDashboardData(req).subscribe(res => {
      this.apiData = res.response;
      this.single = res.response.bannerEngagement;
      let arr = [];
      for(let i = 0; i< this.apiData.bannerEngagement.length; i++){
        let obj = {
          name: this.apiData.bannerEngagement[i].date,
          value: this.apiData.bannerEngagement[i].count
        }
        arr.push(obj);
      }
      single = arr;
      Object.assign(this, {single})
      let arr2 = []
      for(let i = 0; i< this.apiData.campaignEngagement.length; i++){
        let obj = {
          name: this.apiData.campaignEngagement[i].date,
          value: this.apiData.campaignEngagement[i].count
        }
        arr2.push(obj);
      }
      single2 = arr2;
      Object.assign(this, {single2})
    })
  }
  setBanner(){
    if(this.p == this.apiData?.bannerList.length){
      this.p = 1
    }else{
      this.p++;
    }
  }
  getdashboardData(){
    let req = {
      bannerPage: 0,
      bannerSize: 10,
      campaignPage: 0,
      campaignSize: 10,
      bannerSortBy: "owner",
      campaignSortBy: ""
    }
    this.dataService.getDashboardData(req).subscribe(res => {
      this.apiData = res.response;
    })

  }
  close() {
    this.alertMsg.message = '';
  }
  sortTable(type: any, val:string) {
    let req = {
      bannerPage: 0,
      bannerSize: 10,
      campaignPage: 0,
      campaignSize: 10,
      bannerSortBy: type,
      campaignSortBy: type
    }
    this.dataService.getDashboardData(req).subscribe(res => {
      if(val == 'banner'){
        this.apiData.bannerList = res.response.bannerList;
      }else{
        this.apiData.campaignList = res.response.campaignList;
      }
      
    })
  }
  getPage(page: any) {

  }
  openCampaignShareModal(campaign: any) {
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['595px', '450px'];
    } else {
      size = ['350px', '600px'];
    }
    const dialogRef1 = this.dialog.open(ShareModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: campaign,
      disableClose: false
    });
    dialogRef1.afterClosed().subscribe(result => {
      //this.getdashboardData();
      this.getInitialData();
    });
  }

  shareToFb(ele: any) {
    FB.ui({
      app_id: "277274391071647",
      method: 'share',
      href: ele.bannerUrlLink
    },  (response) =>{
      let req = {
        bannerId: ele.bannerId,
        campaignId: null
      }
      if((typeof response) == 'object'){
        this.dataService.sharedOnFb(req).subscribe(res =>{
          if(res.responseCode == 0){
            this.alertMsg.type = 'success';
            this.alertMsg.message = res.successMsg;
            //this.getdashboardData();
            this.getInitialData();
          }
          else if (res.responseCode == -1) {
            this.alertMsg.type = 'danger';
            this.alertMsg.message = res.errorMsg;
          } else {
            this.alertMsg.type = 'danger';
            this.alertMsg.message = 'Server error'
          }
        })
      }else{
        alert("Banner not shared to facebook")
      }
      
    });
  }
  goToWallet(){
    this.router.navigateByUrl('/wallet');
  }
}