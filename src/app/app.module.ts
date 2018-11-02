import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {DatePipe, registerLocaleData} from '@angular/common';


import { AppComponent } from './app.component';

import localePl from '@angular/common/locales/pl';
registerLocaleData(localePl);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pl' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
