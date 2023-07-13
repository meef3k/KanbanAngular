import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpicListComponent } from './epic-list/epic-list.component';
import { EpicCreateComponent } from './epic-create/epic-create.component';
import { EpicDetailComponent } from './epic-detail/epic-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'epics', pathMatch: 'full'},
  {path: 'epics', component: EpicListComponent},
  {path: 'epics/create', component: EpicCreateComponent},
  {path: 'epics/:id', component: EpicDetailComponent},
  {path: 'epics/edit/:id', component: EpicCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
