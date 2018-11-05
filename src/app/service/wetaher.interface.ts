import {Observable} from 'rxjs/Observable';

export interface WetaherInterface {
  getTemperature(): Observable<number>;
}
