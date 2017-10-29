import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  /** holds the url to be called after creating user token  */
  targetUrl: string = null;
  constructor() { }

}
