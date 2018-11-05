import {WetaherInterface} from './wetaher.interface';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

export class AccuWeatherImp implements  WetaherInterface{
  weather: any;

  constructor(public http: HttpClient) {
  }

  getTemperature(): Observable<number> {
    return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/274455?apikey=bf2pDKSViGgIDMfR7z5k4sktCPoVN44e').map(res => {
      this.weather = res;
      return this.weather[0].Temperature.Metric.Value;
    });
  }
}
