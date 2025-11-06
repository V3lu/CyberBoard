import { inject } from "@angular/core";
import { AuthGuardService } from "./auth-guard.service";
import { Router } from "@angular/router";


export const TokenGuard = () => {

  const TC = inject(AuthGuardService);
  const router = inject(Router);
  if(TC.GetToken() != null){
    return true;
  }
  else{
    router.navigate(["/Guest"]);
    return false;
  }
}
