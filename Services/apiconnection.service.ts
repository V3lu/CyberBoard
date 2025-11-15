import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient, private AGS: AuthGuardService) { }

  GetAllAgentMissionsUrl = 'https://localhost:7017/api/Mission/GetAllAgentMissions';
  RegisterAgentFreshUrl = 'https://localhost:7017/api/Register/RegisterAgentFresh';
  CheckEmailAvailabilityUrl = 'https://localhost:7017/api/Register/CheckEmailAvailability';
  LoginAgentUrl = 'https://localhost:7017/api/Login/LoginAgent';

  GetAllAgentMissions(Id : any){
    const token = this.AGS.GetToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.GetAllAgentMissionsUrl, {Id}, {observe: 'response', headers: headers })
  }

  RegisterAgentFresh(Name:string, HashedPassword:string, Email:string) {
    return this.http.post<any>(this.RegisterAgentFreshUrl, {Name, HashedPassword, Email}, {observe: 'response'})
  }

  CheckEmailAvailability(Email:string){
    return this.http.post<any>(this.CheckEmailAvailabilityUrl, {Email}, {observe: 'response'})
  }

  Login(Email:string, HashedPassword:string){
    return this.http.post<any>(this.LoginAgentUrl, {Email, HashedPassword}, {observe: 'response'})
  }
}
