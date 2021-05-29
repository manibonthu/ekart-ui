import { BrowserModule } from '@angular/platform-browser';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA
} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import {
  JwtModule,
  JWT_OPTIONS,
  JwtModuleOptions,
  JwtHelperService
} from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableWidgetComponent } from './widgets/table-widget/table-widget.component';
import { StoresComponent } from './components/stores/stores.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TokenHttpInterceptor } from './services/token.interceptor';
import { DynamicFormModule } from './widgets/dynamic-form/dynamic-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogWidgetComponent } from './widgets/dialog-widget/dialog-widget.component';
import { MaterialModule } from './material.module';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';
import { AuthService } from './services/auth.service';
export function tokenGetter() {
  return localStorage.getItem('token');
}

const jwtModuleOptions: JwtModuleOptions = {
  config: {
    tokenGetter
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    TableWidgetComponent,
    StoresComponent,
    DialogWidgetComponent,
    UserComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    JwtModule.forRoot(jwtModuleOptions),
    MatMenuModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    DynamicFormModule,
    MatDialogModule,
    MaterialModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenHttpInterceptor,
      multi: true
    },
    AuthService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [DialogWidgetComponent]
})
export class AppModule {}
