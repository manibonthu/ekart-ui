import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/roles.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  public signupInvalid: boolean;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }
  async onSubmit() {
    const payload = this.form.value;
    this._authService.createAdminUser(payload).subscribe(
      (result) => {
        this._authService.showMessage('User Created', result.name);
        this._authService.showMessage(
          'You can Login with your email and password'
        );
        this._router.navigateByUrl('/login');
      },
      (err) => {
        this._authService.showMessage(err.statusText, err.error.message);
        this.signupInvalid = true;
      }
    );
  }
}
