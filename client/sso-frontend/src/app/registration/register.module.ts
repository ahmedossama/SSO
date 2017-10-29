import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RegistrationComponent]
})
export class RegistrationModule { }
