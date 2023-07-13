import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpicListComponent } from './epic-list/epic-list.component';
import { EpicCreateComponent } from './epic-create/epic-create.component';
import { EpicDetailComponent } from './epic-detail/epic-detail.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'epics', pathMatch: 'full'},
  {path: 'epics', component: EpicListComponent},
  {path: 'epics/create', component: EpicCreateComponent},
  {path: 'epics/:id', component: EpicDetailComponent},
  {path: 'epics/edit/:id', component: EpicCreateComponent},
  {path: 'epics/:epicId/tasks/create', component: TaskCreateComponent},
  {path: 'epics/:epicId/tasks/:id', component: TaskDetailComponent},
  {path: 'tasks/edit/:id', component: TaskCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
