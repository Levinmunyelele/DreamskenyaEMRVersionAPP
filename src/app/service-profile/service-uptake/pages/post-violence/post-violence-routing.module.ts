import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostViolencePage } from './post-violence.page';

const routes: Routes = [
  {
    path: '',
    component: PostViolencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostViolencePageRoutingModule {}
