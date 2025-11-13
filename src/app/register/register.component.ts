import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { LoggedAgentDataService } from '../../../Services/logged-agent-data.service';
import { catchError, map, throwError } from 'rxjs';

@Component({
    selector: 'app-register',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    registerForm: FormGroup;
    nameSignal = signal('');
    passwordSignal = signal('');
    passwordIcon: boolean = false;
    ispasswordProper: boolean = true;
    nameIcon: boolean = false;

    Register(event : Event){
        event.preventDefault();
        this.APICONN.RegisterAgentFresh(
            this.registerForm.get('Name')!.value,
            this.registerForm.get('Password')!.value
        ).pipe(
            catchError(error => {
                return throwError(() => new Error("Error occured"));
            }
        ),
        map((response) => {
          const data = response.body;
          return{data};
          })
        ).subscribe({
            next: (result) => {
                console.log(result);
            }
        })
    }

    constructor(private APICONN : APIConnectionService, private LoggedAgent : LoggedAgentDataService, private fb : FormBuilder){
        this.registerForm = this.fb.group({
            Name: [''],
            Password: ['']
        })
    }

    assignUsername(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.nameSignal.set(value);

        const valueSignal = this.nameSignal();
        if (valueSignal.length > 0){
            this.nameIcon = true;
            document.getElementById("btnsub")?.removeAttribute('disabled');
        }
        else{
            this.nameIcon = false;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }
    }

    assignPassword(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.passwordSignal.set(value);

        const valueSignal = this.passwordSignal();
        const hasNumber = valueSignal.match("[0-9]+");
        const hasSpecialChar = valueSignal.match("[^A-Za-z0-9]");

        if(valueSignal.length < 8 || hasNumber?.length == null || hasSpecialChar?.length == null){
            this.passwordIcon = false;
            this.ispasswordProper = false;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }

        if(valueSignal.length >= 8 && hasNumber?.length != null && hasSpecialChar?.length != null){
            this.passwordIcon = false;
            this.ispasswordProper = true;
            document.getElementById("btnsub")?.removeAttribute('disabled');
        }
    }


}
