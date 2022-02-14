import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userName ='';
  selectedUserImg: File;
  selectedUserImgPath: any = 'assets/images/profile-pic.png';
  subs1:Subscription;
  subs2:Subscription;
  subs3:Subscription;
  subs4:Subscription;
  constructor(
    private dataService: InitialDataService,
    private router: Router
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
    this.subs4 = this.dataService.userData.subscribe((val:any) =>{
      console.log(val);
      if(val){
        this.userData = val;
      }else{
        this.userData = this.userData;
      }
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
  goToSettings(){
    this.router.navigateByUrl('/profile/settings')
  }
  ngOnDestroy(): void {
      this.subs1.unsubscribe();
      this.subs2.unsubscribe();
      this.subs3.unsubscribe();
      this.subs4.unsubscribe();
  }
}
