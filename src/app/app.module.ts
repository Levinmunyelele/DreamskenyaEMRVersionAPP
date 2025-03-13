import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRoleModalComponent } from './add-role-modal/add-role-modal.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BehaviouralModalPage } from './service-profile/service-uptake/pages/behavioural-modal/behavioural-modal.page';
import { BiomedicalModalPage} from './service-profile/service-uptake/pages/biomedical-modal/biomedical-modal.page';
import { PostViolenceModalPage } from './service-profile/service-uptake/pages/post-violence-modal/post-violence-modal.page';




@NgModule({
  declarations: [AppComponent, AddRoleModalComponent,BehaviouralModalPage, BiomedicalModalPage, PostViolenceModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot() ,
    FormsModule,
    ReactiveFormsModule,  
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
