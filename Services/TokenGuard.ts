import { inject } from "@angular/core";
import { AuthGuardService } from "./auth-guard.service";
import { Router } from "@angular/router";


export const TokenGuard = () => {

  const AGS = inject(AuthGuardService);
  const router = inject(Router);
  if(AGS.GetToken() != null && AGS.GetToken() != ''){
    return true;
  }
  else{
    router.navigate(['/Guest']);
    return false;
  }
}
