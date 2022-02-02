import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ViewNotificationComponent } from './view-notification/view-notification.component';

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
    private dialog : MatDialog
    // private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getNotifications().subscribe(res =>{
      this.apiData = res.response;
      this.dataService.activeLinks.next(this.apiData.activeLinks);
    })
  }

  openNotificationModal(notification:any) {
    console.log(notification);
    let size = ['675px', '475px'];
    if (window.innerWidth > 786) {
      size = ['595px', '450px'];
    } else {
      size = ['350px', '600px'];
    }
    const dialogRef1 = this.dialog.open(ViewNotificationComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: notification,
      disableClose: false
    });
    dialogRef1.afterClosed().subscribe(result => {
      //this.getdashboardData();
      this.markViewed(notification.notiId);
      this.dataService.getNotifications().subscribe(res =>{
        this.apiData = res.response;
        this.dataService.activeLinks.next(this.apiData.activeLinks);
      })
    });
  }
  markViewed(id:any){
    let payload ={
      notiId:[id]
    }
    this.dataService.markViewed(payload).subscribe(res =>{

    })
  }
}

