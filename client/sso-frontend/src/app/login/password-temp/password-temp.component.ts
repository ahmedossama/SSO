import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth.service';

@Component({
  selector: 'app-password-temp',
  templateUrl: './password-temp.component.html',
  styleUrls: ['../login.component.css']
})
export class PasswordTempComponent implements OnInit {
  private form: FormGroup;
  private password: number = null;
  private token;
    private email: string;

  constructor(private fb: FormBuilder, private http: Http, private router: Router, private route :ActivatedRoute,private authService:AuthService) {
   }

  ngOnInit() {
    this.form = this.fb.group({
      password: this.password
    });
     this.route.params.subscribe(params => {
       this.email = params['email'];
     })
  }

  sendEmail(password: number) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = { ontimePass: password , email: this.email};
    return this.http.post('http://localhost:8000/api/Confirmation', body, options).map(response => {
      this.token = response.json();
        console.log('token',this.token);
        window.location.href = this.authService.targetUrl;
    },
    error =>{
      console.log("Error...");
    }).subscribe(
      (response) => {
        console.log(response)
      });

  }

}
