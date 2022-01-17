import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
//import {MatDividerModule} from '@angular/Material/divider';
import {MatToolbarModule} from '@angular/Material/toolbar';
import {MatIconModule} from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
//import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatListModule} from '@angular/material/list'; 
import { RouterModule } from '@angular/router';
import {MatSelectModule} from '@angular/material/select'; 
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    //MatDividerModule,
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
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
