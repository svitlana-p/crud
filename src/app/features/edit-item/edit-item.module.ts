import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditItemRoutingModule } from './edit-item-routing.module';
import { EditItemComponent } from './edit-item.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditItemComponent
  ],
  imports: [
    CommonModule,
    EditItemRoutingModule,
    SharedModule
  ]
})
export class EditItemModule { }
