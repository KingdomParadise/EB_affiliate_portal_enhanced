import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
//import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/Material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
//import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatListModule} from '@angular/material/list'; 

import {MatSelectModule} from '@angular/material/select'; 
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {NgbPaginationModule, NgbAlertModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    DefaultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FlexLayoutModule,
    //LayoutModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatBadgeModule,
    MatSlideToggleModule,
    NgbPaginationModule, 
    NgbAlertModule,
    NgbPopoverModule,
  ]
})
export class DefaultModule { }
