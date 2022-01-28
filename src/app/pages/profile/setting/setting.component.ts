import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InitialDataService } from 'src/app/services/initial-data.service';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit {
  userData: any;
  settings: any;
  personalForm: FormGroup;
  affiliationForm: FormGroup;
  loginForm: FormGroup;
  socialForm: FormGroup;
  countries = [];
  states = [];
  companies = [];
  interests = [];
  enableForm = false;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.personalForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.affiliationForm = this._formBuilder.group({
      companyList: [null],
      intrestAreaList: [null],
    });
    this.socialForm = this._formBuilder.group({
      fb: [''],
      insta: [''],
      tiktok: [''],
      twitter: [''],
      socialHandle:['']
    });
    this.loginForm = this._formBuilder.group({
      email:[],
      password:[]
    })
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getCountries().subscribe((data) => {
      this.countries = data.response.countryList;
    });
    this.dataService.getCompanyList().subscribe((data) => {
      this.companies = data.response.companyList;
    });
    this.dataService.getIntrestArea().subscribe((data) => {
      this.interests = data.response.intrestList;
    });
    this.dataService.getSettings().subscribe((res) => {
      this.settings = res.response;
      this.dataService.activeLinks.next(this.settings.activeLinks);
      this.personalForm = this._formBuilder.group({
        firstName: [this.settings.firstName, Validators.required],
        lastName: [this.settings.lastName, Validators.required],
        countryId: [this.settings.countryId, Validators.required],
        stateId: [this.settings.stateId, Validators.required],
        phone: [this.settings.phone, Validators.required],
      });
      let companiesId = this.settings.companiesList.map((ele: any) => {
        return ele.companyId;
      });
      let interests = this.settings.intrestList.map((ele: any) => {
        return ele.intrestId;
      });
      this.affiliationForm = this._formBuilder.group({
        companyList: [companiesId],
        intrestAreaList: [interests],
      });
      this.socialForm = this._formBuilder.group({
        fb: [this.settings.facebookLink],
        insta: [this.settings.instagramLink],
        tiktok: [this.settings.tiktokLink],
        twitter: [this.settings.twitterLink],
        socialHandle:[this.settings.socialMediaHandle]
      });
      this.loginForm = this._formBuilder.group({
        email:[this.settings.email],
        password:[]
      })
      this.onCountrySelect(this.settings.countryId);

      setTimeout(() => {this.personalForm.disable();this.socialForm.disable();this.affiliationForm.disable()}, 0);
    });
  }
  onCountrySelect(country: any) {
    if (country.countryId) {
      this.dataService.getStates(country.countryId).subscribe((data) => {
        this.states = data.response.stateList;
      });
    }else if(country){
      this.dataService.getStates(country).subscribe((data) => {
        this.states = data.response.stateList;
      });
    }
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
  enableEdit(){
    this.enableForm = true
    this.personalForm.enable();
    this.affiliationForm.enable();
    this.socialForm.enable();
  }
  updateSettings(){
    let payload = {
      ...this.personalForm.value,
      ...this.socialForm.value,
      ...this.affiliationForm.value
    }
    this.dataService.updateAffiliateSetting(payload).subscribe(res =>{
      console.log(res);
    })
  }
}
