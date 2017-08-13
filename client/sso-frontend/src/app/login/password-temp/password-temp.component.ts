import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Component({
  selector: 'app-password-temp',
  templateUrl: './password-temp.component.html',
  styleUrls: ['../login.component.css']
})
export class PasswordTempComponent implements OnInit {
  private form: FormGroup;
  private password: number = null;
  private token;
  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: this.password
    });
  }

  sendEmail(password: number) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = { ontimePass: password };
    return this.http.post('http://localhost:8080/api/Confirmation', body, options).map(response => {
      this.token = response.json();
      console.log(this.token)
    },
    error =>{
      console.log("errorrrrrrrrrrrrrrrrrrrrrr")
    }).subscribe(
      (response) => {
        console.log(response)
      });

  }

}
