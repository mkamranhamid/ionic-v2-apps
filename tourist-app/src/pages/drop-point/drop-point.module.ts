import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DropPointPage } from './drop-point';

@NgModule({
  declarations: [
    DropPointPage,
  ],
  imports: [
    IonicPageModule.forChild(DropPointPage),
  ],
})
export class DropPointPageModule {}
