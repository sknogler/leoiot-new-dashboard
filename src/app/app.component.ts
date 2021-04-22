import {Component, Input, OnInit} from '@angular/core';
import {MqttService} from 'ngx-mqtt';
import {MQTT_SERVICE_OPTIONS} from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dashboard';
  noiseTopic = 'og/107/noise/state';
  tempTopic = 'og/107/temperature/state';
  humidTopic = 'og/107/humidity/state';
  noiseValue: string;
  tempValue: string;
  humidValue: string;

  constructor(private mqttService: MqttService) {}

  ngOnInit(): void {
    console.log('Hello Word');

    this.mqttService.connect(MQTT_SERVICE_OPTIONS);

    setTimeout(() => {
      this.mqttService.unsafePublish(this.noiseTopic, 'unsafePublish');
      this.mqttService.unsafePublish(this.tempTopic, 'unsafePublish');
      this.mqttService.unsafePublish(this.humidTopic, 'unsafePublish');
    }, 1000);

    // Noise observe
    this.mqttService.observe(this.noiseTopic).subscribe(data => {
      console.log(data.topic + ':');
      this.noiseValue = data.payload.toLocaleString().split(',')[0];
      console.log(this.noiseValue);
    });

    // Temperature observe
    this.mqttService.observe(this.tempTopic).subscribe(data => {
      console.log(data.topic + ':');
      this.tempValue = data.payload.toLocaleString().split(',')[0];
      console.log(this.tempValue);
    });

    // Humidity observe
    this.mqttService.observe(this.humidTopic).subscribe(data => {
      console.log(data.topic + ':');
      this.humidValue = data.payload.toLocaleString().split(',')[0];
      console.log(this.humidValue);
    });
  }
}
