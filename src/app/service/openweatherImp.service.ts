import {WetaherInterface} from './wetaher.interface';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

export class OpenweatherImpService implements WetaherInterface {

  weather: any;

  constructor(public http: HttpClient) {
  }

  getTemperature(): Observable<number> {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=krakow&APPID=abf5190fa4b7a6afd9c7d6ab2be3332f').map(res => {
      this.weather = res;
      return this.weather.main.temp - 273.15;
    });
  }
}
