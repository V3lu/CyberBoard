import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient, private AGS: AuthGuardService) { }

  loginControllerUrl = 'https://localhost:7017/api/Mission';


}
