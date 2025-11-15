import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { LoggedAgentDataService } from '../../../Services/logged-agent-data.service';
import { catchError, map, throwError } from 'rxjs';
import { response } from 'express';
import { Agent } from '../../../Models/Agent';

@Component({
    selector: 'app-login',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
    loginForm: FormGroup;

    passwordSignal = signal('');
    passwordIcon: boolean = false;
    isPasswordProper: boolean = true

    emailSignal = signal('')
    emailIcon: boolean = false;
    isEmailProper: boolean = true;

    constructor(private APICONN : APIConnectionService, private LoggedAgent : LoggedAgentDataService, private fb : FormBuilder){
        this.loginForm = this.fb.group({
            Email: [''],
            Password: ['']
        })
    }

    Login(event : Event){
        event.preventDefault();
        this.APICONN.Login(this.loginForm.get('Email')?.value, this.loginForm.get('Password')?.value)
        .pipe(
            catchError(error => {
                return throwError(() => new Error(error))
            }),
            map((response) => {
                console.log(response);
                return response
            })
        )
        .subscribe({
            next: (response) => {
                console.log(response);
                this.LoggedAgent.setLoggedAgent(response.body)
            }
        })
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
        this.tryUnlockSubmitButton();
    }
    
    tryUnlockSubmitButton(){
        if (this.passwordSignal() != '' && this.emailSignal() != ''){
            document.getElementById("btnsub")?.removeAttribute('disabled');
        }
        else{
            document.getElementById("btnsub")?.setAttribute('disabled', 'disabled');
        }
    }
}
