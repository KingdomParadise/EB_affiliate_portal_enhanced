import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  editMode = false;
  userData:any;
  userPhotoUrl: any;
  activeLinks:number;
  totalPoints:number;
  selectedUserImg: File;
  selectedUserImgPath: any = 'assets/images/profile-pic.png';
  subs1:Subscription;
  subs2:Subscription;
  subs3:Subscription;
  constructor(
    private dataService: InitialDataService
  ) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.selectedUserImgPath = this.userData.userImage;
    this.dataService.profileUrl.subscribe(val =>{
      if(val){
        this.selectedUserImgPath = val
      }else{
        this.selectedUserImgPath = this.userData.userImage;
      }

    })

    this.subs1 = this.dataService.activeLinks.subscribe(val =>{
      this.activeLinks = val;
    });
    this.subs2 = this.dataService.totalPoints.subscribe(val =>{
      this.totalPoints = val;
    });

    this.subs3 = this.dataService.editMode.subscribe((val:boolean) =>{
      this.editMode = val
    })

  }

  onFileChanged(event: any, type: string) {
    const reader = new FileReader();

    this.selectedUserImg = event.target.files[0];
    this.dataService.profileImageData.next(this.selectedUserImg);
    reader.readAsDataURL(this.selectedUserImg);
    reader.onload = (_event) => {
      this.selectedUserImgPath = reader.result;
      this.dataService.profileUrl.next(this.selectedUserImgPath);
    };
  }
  ngOnDestroy(): void {
      this.subs1.unsubscribe();
      this.subs2.unsubscribe();
      this.subs3.unsubscribe();
  }
}
