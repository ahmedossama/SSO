import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordTempComponent } from './password-temp/password-temp.component';

@NgModule({
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, PasswordTempComponent]
})
export class LoginModule { }
