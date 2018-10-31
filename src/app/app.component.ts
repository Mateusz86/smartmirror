import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {Chart} from 'chart.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather';

  weather: any;
  water: any;
  date: Date;
  dateTime: Date;
  formated_date: any;
  future_weather: any;
  weatherChart: any;
  temperatures: Array<any> = [];
  rainfalls: Array<any> = [];


  @ViewChild('myChart') myChart: any;
  public context: CanvasRenderingContext2D;


  // na koncu poprzenosic
  constructor(private http: HttpClient, public datepipe: DatePipe) {
  }

  ngOnInit(): void {

    //odswierzamy zergar co 1s
    this.updateDateTime();
    // pobueramy dane co 5 min;
    this.updateAllData();
  }

  /**
   * funkcia wywołuje sie rekurencyjnie  ustawiajac aktualana date
   */
  private updateDateTime() {
    this.dateTime = new Date();
    setTimeout(() => {
      this.updateDateTime();
    }, 1000);
  }

  /**
   * funkcia wywołuje sie rekurencyjnie pobierając dane
   */
  private updateAllData(){
    this.getData();
    setTimeout(() => {
      this.updateAllData();
    }, 5 * 60 * 1000);
  }

  private getData() {

    this.http.get('http://api.openweathermap.org/data/2.5/weather?q=krakow&APPID=abf5190fa4b7a6afd9c7d6ab2be3332f').subscribe(data => {
        this.weather = data;
      }
    );

    this.date = new Date;
    this.formated_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');

    this.http.get('http://mdrozdz6.webd.pl/mapa/wody/getData.php?st=1&dateFrom=' + this.formated_date).subscribe(data => {
      console.log(data);
        this.water = data[0];
      }
    );

    // sprobowac zawezic nanneij danych 
    // nawykresie teraz ,za 6, godz za 12, 24,48(za 2 dni na 12)

    this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=krakow&APPID=abf5190fa4b7a6afd9c7d6ab2be3332f').subscribe(data => {
      console.log(data);
      this.future_weather = data;


      // this.future_weather[i].dt_txt  -> wziac z tego godzine
      //this.datepipe.transform(this.future_weather[i].dt_txt, 'yyyy-MM-dd');

      this.future_weather.list.forEach(element => {
        this.temperatures.push(element.main.temp - 273);
        if (element.rain) {
          

          // return (n+moveY)*finalAmplitude/amplitude;
          this.rainfalls.push(element.rain['3h']);
        } else {
          this.rainfalls.push(0);
        }
      });

      //array z godzinami

      this.context = (<HTMLCanvasElement>this.myChart.nativeElement).getContext('2d');
      var weatherChart = new Chart(this.context, {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Temperature',
            borderColor: 'green',
            fill: false,
            data: this.temperatures.splice(0, 10),
            type: 'line'
          }, {
            label: 'Rainfall',
            borderColor: '#4682B4',
            fill: false,
            data: this.rainfalls.splice(0, 10),
            type: 'line'
          }
          ],
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
      });
    });


  }
}
