import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VehiculoFormPage } from './vehiculo-form';

@NgModule({
  declarations: [
    VehiculoFormPage,
  ],
  imports: [
    IonicPageModule.forChild(VehiculoFormPage),
  ],
})
export class VehiculoFormPageModule {}
