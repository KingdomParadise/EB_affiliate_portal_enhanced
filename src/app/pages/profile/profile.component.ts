import { Component, OnInit } from '@angular/core';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  editMode = false;
  userData:any;
  userPhotoUrl: any;
  activeLinks:number;
  selectedUserImg: File;
  selectedUserImgPath: any = 'assets/images/profile-pic.png';
  constructor(
    private dataService: InitialDataService
  ) {

  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.selectedUserImgPath = this.userData.userImage;

    this.dataService.activeLinks.subscribe(val =>{
      this.activeLinks = val;
    });
    this.dataService.editMode.subscribe((val:boolean) =>{
      this.editMode = val
    })

  }

  onFileChanged(event: any, type: string) {
    const reader = new FileReader();

    this.selectedUserImg = event.target.files[0];
    reader.readAsDataURL(this.selectedUserImg);
    reader.onload = (_event) => {
      this.selectedUserImgPath = reader.result;
    };
  }
}
