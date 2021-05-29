import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/roles.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getProfile();
    this.isAdmin = user.role === Role.ADMIN ? true : false;
  }

  logout() {
    this.authService.showMessage('Logged Off');
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
