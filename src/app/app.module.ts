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
import { EnrollmentFormComponent } from './service-profile/service-uptake/modals/enrollment-form/enrollment-form.component';
import { HomeVisitComponent} from './service-profile/service-uptake/modals/home-visit/home-visit.component';
import { PrepRastComponent } from './service-profile/service-uptake/modals/prep-rast/prep-rast.component';
import { BusinessFollowUpComponent } from './service-profile/service-uptake/modals/business-follow-up/business-follow-up.component';
import { AgywGraduationComponent} from './service-profile/service-uptake/modals/agyw-graduation/agyw-graduation.component';
import { StiScreeningComponent } from './service-profile/service-uptake/modals/sti-screening/sti-screening.component';
import { BusinessAssessmentComponent } from './service-profile/service-uptake/modals/business-assessment/business-assessment.component';
import { HtsEligibilityComponent } from './service-profile/service-uptake/modals/hts-eligibility/hts-eligibility.component';




@NgModule({
  declarations: [AppComponent, AddRoleModalComponent,BehaviouralModalPage, 
    BiomedicalModalPage, PostViolenceModalPage, EnrollmentFormComponent,
    HomeVisitComponent,PrepRastComponent, BusinessFollowUpComponent, 
    AgywGraduationComponent,StiScreeningComponent,BusinessAssessmentComponent,HtsEligibilityComponent ],
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
