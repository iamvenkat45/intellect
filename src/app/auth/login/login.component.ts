import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginErrorMessage: string;
  constructor(private fb: FormBuilder, private readonly authService: AuthService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.loginErrorMessage = '';
    this.authService
      .login(this.form.value)
      .then(() => this.router.navigate(['/dashboard']))
      .catch((error) => {
        this.loginErrorMessage = error.message;
        if (error.code === 'auth/wrong-password') {
          this.loginErrorMessage = 'Wrong password, please enter the correct password';
        } else if (error.code === 'auth/user-not-found') {
          this.loginErrorMessage = 'There is no user corresponding to the given email';
        } else if (error.code === 'auth/invalid-email') {
          this.loginErrorMessage = 'Email address is not valid, pleaseenter the correct email';
        }
      });
  }

}
