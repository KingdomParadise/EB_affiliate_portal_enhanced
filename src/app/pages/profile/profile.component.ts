import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData:any;
  userPhotoUrl: any;
  activeLinks:number;
  constructor(
    private dataService: InitialDataService
  ) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.userPhotoUrl = this.userData.userImage;
    this.dataService.activeLinks.subscribe(val =>{
      this.activeLinks = val;
    })

  }

}
