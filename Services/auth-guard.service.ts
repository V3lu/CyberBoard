import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private readonly platformId = inject(PLATFORM_ID);

  constructor() { }

  GetToken(){
    let token : string | null = '' 

    try{
      token = sessionStorage?.getItem("Token");
    }
    catch(err){ }

    return token
  }
}
