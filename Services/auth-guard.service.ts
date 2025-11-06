import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  GetToken(){
    return sessionStorage.getItem("Token");
  }
}
