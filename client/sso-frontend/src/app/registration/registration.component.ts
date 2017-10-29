import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private form: FormGroup;
  private email: string = "";
  private userName: string = "";
  private staffId: number = null;

  constructor(private fb: FormBuilder, private http: Http, private router: Router) { }

  ngOnInit() {
    debugger
    this.form = this.fb.group({
      email: this.email,
      staffId: this.staffId,
      userName: this.userName

    });
  }

  register(email, userName, staffId) {
        let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    var body={email:email, userName: userName, staffId: staffId}
    return this.http.post('http://localhost:8000/api/registration',body, options).map(response => {
      console.log(response.json())
    }).subscribe(() => { })
  }
}
