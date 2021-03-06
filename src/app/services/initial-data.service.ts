import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { retry, catchError, publishReplay, refCount } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class InitialDataService {
  private apiUrl = environment.apiUrl;
  public isSettingChanged = new BehaviorSubject<boolean>(false);
  settingDataSource = this.isSettingChanged.asObservable();

  public activeLinks = new BehaviorSubject<number>(0);
  activeLinkDataSource = this.activeLinks.asObservable();

  public totalPoints = new BehaviorSubject<number>(0);
  totalPointsDataSource = this.totalPoints.asObservable();

  public editMode = new BehaviorSubject<boolean>(false);
  editModeDataSource = this.editMode.asObservable();

  public profileUrl = new BehaviorSubject<string>('');
  profileUrlDataSource = this.profileUrl.asObservable();

  public profileImageData = new BehaviorSubject<any>(null);
  profileImageDataDataSource = this.profileImageData.asObservable();

  user = JSON.parse(localStorage.getItem('userData') || '{}');
  public userData = new BehaviorSubject<any>(null || this.user);
  userNameDataSource = this.userData.asObservable();

  constructor(private http: HttpClient) {}

  getCompanyList(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/affiliate/getCompanyList')
      .pipe(retry(1), catchError(this.handleError));
  }

  getIntrestArea(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/affiliate/getIntrestArea')
      .pipe(retry(1), catchError(this.handleError));
  }
  getCountries(): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/dealer/getCountryCode')
      .pipe(retry(1), catchError(this.handleError));
  }
  getStates(id: number): Observable<any> {
    return this.http
      .get<any>(this.apiUrl + '/dealer/getStates/countryId/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }
  checkUsernameExist(username: string) {
    return this.http
      .get<any>(
        this.apiUrl + '/affiliate/checkUsernameExist/userName/' + username
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  register(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/register', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  validateOtp(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/validateOtp', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  resendOtp(data: any){
    return this.http
      .post<any>(this.apiUrl + '/affiliate/resendOtp', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  login(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/login', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  getDashboardData(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getDashboardData', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  referFriends(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/referFriends', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  contactUs(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/contactUs', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  sharedOnFb(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/sharedOnFb', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  getAffiliateNotification() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getAffiliateNotification', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  marAffiliateNotificationRead() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/marAffiliateNotificationRead', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  updateAffiliateSetting(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/updateAffiliateSetting', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  changeAffiliatePassword(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/changeAffiliatePassword', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  affililateWallet(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/affililateWallet', data)
      .pipe(retry(1), catchError(this.handleError));
  }



  getOverview() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getOverview', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  getOutReach(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getOutReach', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  getCompanyAffiliations() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getCompanyAffiliations', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  getNotifications() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getNotifications', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  markViewed(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/markViewed', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  getPoints() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getPoints', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  exploreDealer(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/exploreDealer', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  dealerDetails(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/dealerDetails', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  sendAffiliateRequest(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/sendAffiliateRequest', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  getSettings() {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/getSettings', {})
      .pipe(retry(1), catchError(this.handleError));
  }
  exploreCampaign(data: any) {
    return this.http
      .post<any>(this.apiUrl + '/affiliate/exploreCampaign', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  forgotPassword(data: any){
    return this.http
      .post<any>(this.apiUrl + '/affiliate/forgotPassword', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  
  affiliatePayment(data: any){
    return this.http
      .post<any>(this.apiUrl + '/affiliate/affiliatePayment', data)
      .pipe(retry(1), catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
