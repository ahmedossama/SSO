import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private email: string = "";
  constructor(private fb: FormBuilder, private http: Http, private router: Router, private activatedRoute: ActivatedRoute,private authService: AuthService ) {
    this.activatedRoute.queryParamMap.subscribe((params: Params)=>{
     this.authService.targetUrl =  params.params['targetUrl'] || null;
    });
  }

  ngOnInit() {

    this.form = this.fb.group({
      emailField: this.email
    });
  }
  sendEmail(email: string) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let body = { email: email };
    return this.http.post('http://localhost:8000/api/authenticate', body, options).map(response => {
      console.log(response.json());

    }).subscribe(() => {

      this.router.navigate(['/password', { email: email }], { skipLocationChange: true });

    }

      );

  }

}
