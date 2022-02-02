import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-affiliate-registration',
  templateUrl: './affiliate-registration.component.html',
  styleUrls: ['./affiliate-registration.component.css'],
})
export class AffiliateRegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
  regForm1: FormGroup;
  regForm3: FormGroup;
  regForm2: FormGroup;
  regForm4: FormGroup;
  isCompleted1: boolean = false;
  isCompleted2: boolean = false;
  isCompleted3: boolean = true;
  isEditable = true;
  companies = [];
  interests = [];
  isLinear = true;
  hide = true;
  countries = [];
  states = [];
  currentStepperImage = 'assets/images/form1.png';
  stepperImages = [
    {
      url: 'assets/images/form1.png',
    },
    {
      url: 'assets/images/form2.png',
    },
    {
      url: 'assets/images/form3.png',
    },
  ];
  showPasswordInput: boolean = true;
  alertMsg: any = {
    type: '',
    message: '',
  };
  usernameValid = 0;
  agreed: boolean = false;
  verificationState: number = 1;
  affiliateId: any;
  passwordValidity = {
    length: false,
    isLowercase: false,
    isUppercase: false,
    isNumerical: false,
    isSpecial: false,
  };
  subscription1: Subscription;
  @ViewChild('stepper') stepper: MatStepper;
  constructor(
    private _formBuilder: FormBuilder,
    private dataService: InitialDataService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.dataService.getCountries().subscribe((data) => {
      this.countries = data.response.countryList;
    });
    this.dataService.getCompanyList().subscribe((data) => {
      this.companies = data.response.companyList;
    });
    this.dataService.getIntrestArea().subscribe((data) => {
      this.interests = data.response.intrestList;
    });
    this.regForm1 = this._formBuilder.group({
      email: [null, Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
          ),
        ],
      ],
      cnfPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
          ),
        ],
      ],
    });
    this.regForm2 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      phone: ['', Validators.required],
      referalCode: [''],
    });

    this.regForm3 = this._formBuilder.group({
      companyList: [''],
      intrestAreaList: [''],
    });
    this.regForm4 = this._formBuilder.group({
      otpNumber: [1111, Validators.required],
    });
    // if (history.state.affiliateId) {
    //   this.isLinear = false;
    //   setTimeout(() => {
    //     this.stepper.selectedIndex = 2;
    //   }, 1);
    // }
    if (history.state.affiliateId) {
      this.affiliateId = history.state.affiliateId;
      this.showPasswordInput = false;
      this.regForm1.controls.password.setValidators(null);
      this.regForm1.controls.password.updateValueAndValidity();
      this.isCompleted1 = true;
      setTimeout(() => {
        this.stepper.next();
      }, 0);
    }

    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
    // const mapProperties = {
    //   center: new google.maps.LatLng(35.2271, -80.8431),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    this.subscription1 = this.authService.authState.subscribe((user) => {
      console.log(user);
      this.regForm1.patchValue({
        email: user.email
      });
      let req;
      if (user.provider == 'FACEBOOK') {
        req = {
          loginType: 'facebook',
          socialLoginId: user.id,
        };
      } else if (user.provider == 'GOOGLE') {
        req = {
          loginType: 'google',
          socialLoginId: user.id,
        };
      }
      this.dataService.login(req).subscribe((res) => {
        if (res.responseCode == 0) {
          localStorage.setItem('affiliateId', res.response.affiliateId);
          this.affiliateId = res.response.affiliateId;
          if (res.response.firstTimeLogin == 1) {
            this.stepper.next();
            //this.router.navigateByUrl('/', {state: { affiliateId: res.response.affiliateId, page:'login' }});
          } else if (res.response.firstTimeLogin == 0) {
            if (res.response.phoneVerified == 0) {
              this.router.navigateByUrl('/verify', {
                state: { affiliateId: res.response.affiliateId },
              });
            } else {
              localStorage.setItem('token', res.response.token);
              localStorage.setItem('referalCode', res.response.referalCode);
              localStorage.setItem('referalReward', res.response.referalReward);
              localStorage.setItem('userData', JSON.stringify(res.response));
              this.router.navigateByUrl('/profile/overview', {
                state: { affiliateId: res.response.affiliateId },
              });
            }
          }

          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error';
        }
      });
    });
  }
  get f1() {
    return this.regForm1.controls;
  }
  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => 'none';
  }
  onCountrySelect(country: any) {
    if (country) {
      this.dataService.getStates(country.countryId).subscribe((data) => {
        this.states = data.response.stateList;
      });
    }
  }
  onUsernameEnter(eve: any) {
    let username = eve.target.value;
    this.dataService.checkUsernameExist(username).subscribe((res) => {
      if (res.responseCode == 0) {
        this.usernameValid = 1;
      } else if (res.responseCode == -1) {
        this.usernameValid = 2;
      } else {
        this.usernameValid = 0;
      }
    });
  }
  public onStepChange(event: any): void {
    //this.currentStepperImage= this.stepperImages[event.selectedIndex].url;
  }

  close() {
    this.alertMsg.message = '';
  }
  submit() {
    delete this.regForm1.value.cnfPassword;
    let formObj = {
      ...this.regForm1.value,
      ...this.regForm2.value,
      ...this.regForm3.value,
    };
    if (this.regForm2.valid) {
      if (this.affiliateId) {
        formObj.affiliateId = history.state.affiliateId;
      }
      this.dataService.register(formObj).subscribe((res) => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          // this.alertMsg.message = res.successMsg;
          //this.stepper.next();
          localStorage.setItem('affiliateId', res.response.affiliateId);
          this.verificationState = 2;
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error';
        }
      });
    }
  }
  verifyOtp() {
    if (this.regForm4.valid) {
      this.regForm4.value.affiliateId = localStorage.getItem('affiliateId');
      this.dataService.validateOtp(this.regForm4.value).subscribe((res) => {
        if (res.responseCode == 0) {
          this.alertMsg.type = 'success';
          this.alertMsg.message = res.successMsg;
          localStorage.setItem('token', res.response.token);
          localStorage.setItem('referalCode', res.response.referalCode);
          localStorage.setItem('referalReward', res.response.referalReward);
          localStorage.setItem('userData', JSON.stringify(res.response));
          this.router.navigateByUrl('/profile/overview');
        } else if (res.responseCode == -1) {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = res.errorMsg;
        } else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error';
        }
      });
    }
  }
  verifyOtp1() {
    this.verificationState = 2;
  }
  logInWithFb() {
    this.isCompleted1 = true;
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  logInWithGoogle() {
    this.isCompleted1 = true;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  showValidityState(val: any) {
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let regExp = /[^<>{}\"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©0-9_+]/g;
    let value = (val.target.value).toString();
    if (value.length > 7) {
      this.passwordValidity.length = true;
    } else {
      this.passwordValidity.length = false;
    }
    if(value.match(upperCaseLetters)){
      this.passwordValidity.isUppercase = true;
    }else{
      this.passwordValidity.isUppercase = false;
    }
    if(value.match(lowerCaseLetters)){
      this.passwordValidity.isLowercase = true;
    }else{
      this.passwordValidity.isLowercase = false;
    }
    if(value.match(numbers)){
      this.passwordValidity.isNumerical = true;
    }else{
      this.passwordValidity.isNumerical = false;
    }
    if(this.containsSpecialChars(value)){
      this.passwordValidity.isSpecial = true;
    }else{
      this.passwordValidity.isSpecial = false;
    }
  }
  containsSpecialChars(str:any) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  ngOnDestroy(): void {
      this.subscription1.unsubscribe();
  }
}
