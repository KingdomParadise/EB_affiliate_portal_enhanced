import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  industries: any;
  countries: any;
  states: any;
  alertMsg: any = {
    type: '',
    message: '',
  };
  userData: any;

  facebookLink: string;
  linkedinLink: string;
  instaLink: string;
  selectedCompanyLogo: File;
  selectedUserImg: File;
  selectedCompanyLogoPath: any = 'assets/images/profile-pic.png';
  selectedUserImgPath: any = 'assets/images/profile-pic.png';
  companies: any[] = [];
  interests: any[] = [];
  isEditable: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.isEditable = false;
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.selectedCompanyLogoPath = this.userData.userImage;
    this.selectedUserImgPath = this.userData.userImage;
    this.facebookLink = this.userData.facebookLink;
    this.linkedinLink = this.userData.linkedinLink;
    this.instaLink = this.userData.instaLink;

    this.profileForm = this._formBuilder.group({
      firstName: [this.userData.firstName, Validators.required],
      lastName: [this.userData.lastName, Validators.required],
      email: [this.userData.email, [Validators.required, Validators.email]],
      phone: [this.userData.phone, Validators.required],
      intrestAreaList: [this.userData.intrestAreaList],
      companyList: [this.userData.companyList],
    });
    this.dataService.getCompanyList().subscribe((data) => {
      this.companies = data.response.companyList;
    });
    this.dataService.getIntrestArea().subscribe((data) => {
      this.interests = data.response.intrestList;
    });
    this.disableEdit();
  }

  onFileChanged(event: any, type: string) {
    const reader = new FileReader();

    this.selectedUserImg = event.target.files[0];
    reader.readAsDataURL(this.selectedUserImg);
    reader.onload = (_event) => {
      this.selectedUserImgPath = reader.result;
    };
  }
  submit() {}
  close() {
    this.alertMsg.message = '';
  }
  openChangePasswordDialog() {
    let size = ['375px', '375'];
    if (window.innerWidth > 786) {
      size = ['475px', '540px'];
    } else {
      size = ['350px', '400px'];
    }
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      maxWidth: size[0],
      maxHeight: size[1],
      height: '100%',
      width: '100%',
      data: 'h',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  updateChanges() {
    if (this.profileForm.valid) {
      this.spinner.show();
      //update socila info
      let obj = {
        facebookLink: this.facebookLink,
        linkedinLink: this.linkedinLink,
        instaLink: this.instaLink,
      };
      //
      //update profile info
      let formData = new FormData();
      formData.append('data', JSON.stringify(this.profileForm.value));
      formData.append('userPhoto', this.selectedUserImg);
      this.dataService.updateAffiliateSetting(formData).subscribe((res) => {
        if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else if (res.responseCode == 0) {
          this.profileForm.patchValue(res.response);
          localStorage.setItem('userData', JSON.stringify(res.response));
          this.dataService.isSettingChanged.next(true);
          this.disableEdit();
          this.alertMsg.message = res.successMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error';
        }
        this.spinner.hide();
      });
    }
  }
  enableEdit() {
    this.isEditable = true;
    this.profileForm.controls['firstName'].enable();
    this.profileForm.controls['lastName'].enable();
    this.profileForm.controls['email'].enable();
    this.profileForm.controls['phone'].enable();
    this.profileForm.controls['intrestAreaList'].enable();
    this.profileForm.controls['companyList'].enable();
  }

  disableEdit() {
    this.isEditable = false;
    this.profileForm.controls['firstName'].disable();
    this.profileForm.controls['lastName'].disable();
    this.profileForm.controls['email'].disable();
    this.profileForm.controls['phone'].disable();
    this.profileForm.controls['intrestAreaList'].disable();
    this.profileForm.controls['companyList'].disable();
  }
}
