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
    path: 'service-uptake1',
    loadChildren: () => import('./service-uptake/service-uptake.module').then( m => m.ServiceUptakePageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'visit/:patientUuid/:idPart/:cleanName',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule)
  },
  
  {
    path: 'patients/:uuid/:id/:age/:name',
    loadChildren: () => import('./patients/patients.module').then( m => m.PatientsPageModule)
  },
  {
    path: 'service-uptake/:uuid',
    loadChildren: () => import('./service-profile/service-uptake/service-uptake.module').then( m => m.ServiceUptakePageModule)
  },
  {
    path:'behavioural',
    loadChildren: () => import('./service-profile/service-uptake/pages/behavioural/behavioural.module').then( m => m.BehaviouralPageModule)
  },
  {
    path:'bio-medical',
    loadChildren: () => import('./service-profile/service-uptake/pages/bio-medical/bio-medical.module').then( m => m.BioMedicalPageModule)
  }, 
  {
    path:'post-violence',
    loadChildren: () => import('./service-profile/service-uptake/pages/post-violence/post-violence.module').then( m => m.PostViolencePageModule)
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
