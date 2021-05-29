import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, User } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService as jwt } from '@auth0/angular-jwt';
import { Store } from '../models/store.model';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private jwtHelper: jwt,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  createAdminUser(user: User) {
    const url = `${environment.baseUrl}${environment.adminSigUp}`;
    return this.http.post<User>(url, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  showMessage(text: string, action?: string) {
    this._snackBar.open(text, action, {
      duration: 2000
    });
  }

  login(user: Login): Observable<User> {
    const url = `${environment.baseUrl}${environment.loginUrl}`;
    return this.http
      .post<User>(url, user)
      .pipe(tap((user) => this.doLoginUser(user)));
  }

  getStores(): Observable<Store[]> {
    const url = `${environment.baseUrl}${environment.stores}`;
    return this.http.get<Store[]>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  createStore(store: Store) {
    const url = `${environment.baseUrl}${environment.stores}`;
    return this.http.post<Store>(url, store).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  updateStore(store: Pick<Store, '_id' | 'name' | 'location' | 'phone'>) {
    const url = `${environment.baseUrl}${environment.stores}/${store._id}`;
    return this.http.put<Store>(url, store).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  deleteStore(id: string) {
    const url = `${environment.baseUrl}${environment.stores}/${id}`;
    return this.http.delete<Store>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  private doLoginUser(user: User) {
    localStorage.setItem('token', user.token);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }

  public getProfile(): User {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token);
  }

  getUsers(): Observable<User[]> {
    const url = `${environment.baseUrl}${environment.user}`;
    return this.http.get<User[]>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  createUser(user: User) {
    const url = `${environment.baseUrl}${environment.userSignup}`;
    return this.http.post<User>(url, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  deleteUser(id: string) {
    const url = `${environment.baseUrl}${environment.user}/${id}`;
    return this.http.delete<User>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  updateUser(user: Pick<User, 'name' | 'store' | '_id'>) {
    const url = `${environment.baseUrl}${environment.user}/${user._id}`;
    return this.http.put<User>(url, user).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    const url = `${environment.baseUrl}${environment.product}`;
    return this.http.get<Product[]>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }
  createProduct(product: Product): Observable<Product> {
    const url = `${environment.baseUrl}${environment.product}`;
    return this.http.post<Product>(url, product).pipe();
  }

  updateProduct(product: Product) {
    const url = `${environment.baseUrl}${environment.product}/${product._id}`;
    return this.http.put<Product>(url, product).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  deleteProduct(id: string) {
    const url = `${environment.baseUrl}${environment.product}/${id}`;
    return this.http.delete<Product>(url).pipe(
      catchError((err: HttpErrorResponse) => {
        return this.logError(err);
      })
    );
  }

  logError(err: HttpErrorResponse) {
    this.showMessage(err.statusText, err.error.message);
    if (err?.error?.message === 'Session Expired') {
      localStorage.removeItem('token');

      this.router.navigate(['/login']);
    }
    return throwError(err);
  }
}
