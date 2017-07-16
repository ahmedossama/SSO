import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private email:string ="";
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.form = this.fb.group({
      emailField: this.email
    });
  }
  sendEmail(email:string){
    console.log(email);
  }

}
