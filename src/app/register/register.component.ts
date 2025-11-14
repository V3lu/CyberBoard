import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
export class RegisterComponent{
    registerForm: FormGroup;

    nameSignal = signal('');
    nameIcon: boolean = false;

    passwordSignal = signal('');
    passwordIcon: boolean = false;
    isPasswordProper: boolean = true

    emailSignal = signal('')
    emailIcon: boolean = false;
    isEmailProper: boolean = true;
    

    Register(event : Event){
        event.preventDefault();
        this.APICONN.RegisterAgentFresh(
            this.registerForm.get('Name')!.value,
            this.registerForm.get('Password')!.value,
            this.registerForm.get('Email')?.value
        ).pipe(
            catchError(error => {
                return throwError(() => new Error(error));
            }
        ),
        map((response) => {
          const data = response.body;
          return{data};
          }
        )
        ).subscribe({
            next: (result) => {
                console.log(result);
            }
        })
    }

    constructor(private APICONN : APIConnectionService, private LoggedAgent : LoggedAgentDataService, private fb : FormBuilder){
        this.registerForm = this.fb.group({
            Name: [''],
            Email: [''],
            Password: ['']
        })
    }

    assignUsername(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.nameSignal.set(value);

        const valueSignal = this.nameSignal();
        if (valueSignal.length > 0){
            this.nameIcon = true;
            this.tryUnlockSubmitButton();
        }
        else{
            this.nameIcon = false;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
            this.tryUnlockSubmitButton();
        }
    }

    assignEmail(event : Event){
        const value = (event.target as HTMLInputElement).value;
        this.emailSignal.set(value);

        if (this.emailSignal().length > 0){
            this.APICONN.CheckEmailAvailability(this.emailSignal())
            .pipe(
                map((response) => {
                    console.log(response);
                    return {response}
                }),
                catchError((err) => {
                    if (err.status == 409){
                        this.isEmailProper = false;
                        document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
                        this.emailIcon = false;
                    }
                    return throwError(() => new Error(err));
                })
            ).subscribe({
                next: ((response) => {
                    this.isEmailProper = true;
                    this.tryUnlockSubmitButton();
                    this.emailIcon = true;
                })
            })
        }
        else{
            this.isEmailProper = true;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
            this.emailIcon = false;
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
            this.isPasswordProper = false;
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }

        if(valueSignal.length >= 8 && hasNumber?.length != null && hasSpecialChar?.length != null){
            this.passwordIcon = true;
            this.isPasswordProper = true;
            this.tryUnlockSubmitButton();
        }
    }

    tryUnlockSubmitButton(){
        if (this.passwordSignal() != '' && this.emailSignal() != '' && this.nameSignal() != ''){
            document.getElementById("btnsub")?.removeAttribute('disabled');
        }
        else{
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }
    }


}
