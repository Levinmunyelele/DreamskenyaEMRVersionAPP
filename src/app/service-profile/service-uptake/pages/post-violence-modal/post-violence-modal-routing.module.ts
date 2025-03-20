import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostViolenceModalPage } from './post-violence-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PostViolenceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostViolenceModalPageRoutingModule {}
