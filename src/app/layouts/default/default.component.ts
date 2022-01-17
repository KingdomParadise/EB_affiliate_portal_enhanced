import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { map, filter, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  isPartialClose = false;
  sideBarOpen = true;
  marginLeft = '0px';
  hasBackdrop = false;
  @ViewChild('drawer') drawer: MatSidenav;
  //constructor() { }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    router: Router) {
    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.sideBarOpen = false);
  }
  ngOnInit(): void {
    if (window.innerWidth < 786) {
      this.sideBarOpen = false;
      this.isPartialClose = false;
      this.hasBackdrop = true;
    }else{

      this.marginLeft = '240px';
      this.hasBackdrop = false;
    }
  }
  sideBarToggler() {
    if (window.innerWidth < 786) {
      this.sideBarOpen = !this.sideBarOpen;
      this.marginLeft = '0px'
    }else{

      this.isPartialClose = !this.isPartialClose;
      if(this.isPartialClose){
        this.marginLeft = '90px';
      }else{
        this.marginLeft ='240px'
      }
    }
  }
}
