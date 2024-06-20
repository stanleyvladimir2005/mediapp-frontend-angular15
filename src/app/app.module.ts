import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './pages/login/login.component';
import {environment} from "../environments/environment";
import {JwtModule} from "@auth0/angular-jwt";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ServerErrorsInterceptor} from "./shared/server-errors.interceptor";
import {MaterialModule} from "./material/material.module";

export function tokenGetter() {
  return sessionStorage.getItem(environment.TOKEN_NAME);
}

@NgModule({ declarations: [
        AppComponent,
        LoginComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: ["localhost:8080"],
                disallowedRoutes: ["http://localhost:8080/login/forget"],
            },
        })], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorsInterceptor,
            multi: true
        },
        {
            provide: LocationStrategy, useClass: HashLocationStrategy
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
