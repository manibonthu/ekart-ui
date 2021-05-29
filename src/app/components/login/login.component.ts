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

  public loginInvalid: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }
  async onSubmit() {
    this._authService.login(this.form.value).subscribe(
      (result) => {
        this._authService.showMessage('Welcome', result.name);
        this._router.navigateByUrl('/home');
      },
      (err) => {
        this._authService.showMessage(err.statusText, err.error.message);
        this.loginInvalid = true;
      }
    );
  }
}
