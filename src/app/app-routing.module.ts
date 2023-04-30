import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) },
  { path: 'add-item', loadChildren: () => import('./features/add-item/add-item.module').then(m => m.AddItemModule) },
  { path: 'edit-item', loadChildren: () => import('./features/edit-item/edit-item.module').then(m => m.EditItemModule) },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
