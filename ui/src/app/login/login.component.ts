import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    this.userService.login(this.form.value).pipe(
      catchError(error => {
        this.errorMessage = 'Wrong username or password';
        this.form.get('username').setErrors(['invalid']);
        this.form.get('password').setErrors(['invalid']);
        return throwError(error);
      })
    ).subscribe(response => {
      this.userService.setToken(response.token);
      this.router.navigate(['/']);
    });
  }
}
