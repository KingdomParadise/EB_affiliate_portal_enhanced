import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  userData:any;
  settings:any;
  personalForm: FormGroup;
  affiliationForm: FormGroup;
  countries = [];
  states = [];
  companies = [];
  interests = [];
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.dataService.getCountries().subscribe(data => {
      this.countries = data.response.countryList;
    });
    this.dataService.getCompanyList().subscribe(data => {
      this.companies = data.response.companyList;
    });
    this.dataService.getIntrestArea().subscribe(data => {
      this.interests = data.response.intrestList;
    });
    this.dataService.getSettings().subscribe((res) => {
      this.settings = res.response;
      this.personalForm = this._formBuilder.group({
        firstName: [this.settings.firstName, Validators.required],
        lastName: [this.settings.lastName, Validators.required],
        countryId: [this.settings.countryId, Validators.required],
        stateId: [this.settings.stateId, Validators.required],
        phone: [this.settings.phone, Validators.required],
      });
      this.affiliationForm = this._formBuilder.group({
        companyList: [''],
        intrestAreaList: [''],
      });
    });

  }
  onCountrySelect(country:any){
    if(country){
      this.dataService.getStates(country.countryId).subscribe(data =>{
        this.states = data.response.stateList;
      })
    }
  }
}
