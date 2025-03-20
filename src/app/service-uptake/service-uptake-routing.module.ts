import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceUptakePage } from './service-uptake.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceUptakePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceUptakePageRoutingModule {}
