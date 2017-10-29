import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 

import { AppComponent } from './app.component';
import { AuthService } from 'app/shared/auth.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpModule

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
