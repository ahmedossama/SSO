import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import { AppComponent } from './app.component';
 import { PasswordTempComponent } from './login/password-temp/password-temp.component'

// import { AccountManagementComponent } from "./account-management/account-management.component";

const routes: Routes = [
            { path: 'SSO', component: LoginComponent },
            {path: 'password',component: PasswordTempComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
