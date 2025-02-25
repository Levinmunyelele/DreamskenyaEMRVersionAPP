import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full'      
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'role-management',
    loadChildren: () => import('./role-management/role-management.module').then( m => m.RoleManagementPageModule)
  },
  {
    path: 'create-person',
    loadChildren: () => import('./create-person/create-person.module').then( m => m.CreatePersonPageModule)
  },
  {
    path: 'person',
    loadChildren: () => import('./person/person.module').then( m => m.PersonPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./form/form.module').then( m => m.FormPageModule)
  },
  {
    path: 'screening',
    loadChildren: () => import('./screening/screening.module').then( m => m.ScreeningPageModule)
  },
  {
    path: 'screened',
    loadChildren: () => import('./screened/screened.module').then( m => m.ScreenedPageModule)
  },
  {
    path: 'enrollment',
    loadChildren: () => import('./enrollment/enrollment.module').then( m => m.EnrollmentPageModule)
  },
  {
    path: 'vulnerability-screening/:patientUuid/:idPart/:cleanName',
    loadChildren: () => import('./vulnerability-screening/vulnerability-screening.module').then(m => m.VulnerabilityScreeningPageModule)
  },    
  {
    path: 'screened-agwy',
    loadChildren: () => import('./screened-agwy/screened-agwy.module').then( m => m.ScreenedAGWYPageModule)
  },
  {
    path: 'service-uptake',
    loadChildren: () => import('./service-uptake/service-uptake.module').then( m => m.ServiceUptakePageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'visit/:patientUuid',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  },
  {
    path: 'patient-summary/:uuid/:id/:age/:name',
    loadChildren: () => import('./patients-summarry/patients-summarry.module').then( m => m.PatientsSummarryPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
