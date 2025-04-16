import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomyPage } from './homy.page';

const routes: Routes = [
  {
    path: '',
    component: HomyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomyPageRoutingModule {}
