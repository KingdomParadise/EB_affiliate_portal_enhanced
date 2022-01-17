import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InitialDataService } from 'src/app/services/initial-data.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  contact: FormGroup;
  alertMsg: any = {
    type: '',
    message: ''
  };
  page:any;
  userData:any;
  @ViewChild('form') form: ElementRef;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private dataService: InitialDataService,
    private route: ActivatedRoute
  ) {
    this.page =this.route.snapshot.paramMap.get('page');
   }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.contact = this._formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });

  }
  ngAfterViewInit(){
    if(this.page){
      this.form.nativeElement.scrollIntoView();

    }
  }
  close(){

  }
  sortTable(val:any){

  }
  toggleVideo(){
    this.videoplayer.nativeElement.play();
  }
  contactUs(){
    this.dataService.contactUs(this.contact.value).subscribe(res =>{
      if(res.responseCode == 0){
        this.alertMsg.type = 'success';
        this.alertMsg.message = res.successMsg
      }else {
          this.alertMsg.type = 'danger';
          this.alertMsg.message = 'Server error'
        }
    })
  }
}
