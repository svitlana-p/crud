import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditItemComponent } from './edit-item.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [{ path: '', component: EditItemComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditItemRoutingModule { }
