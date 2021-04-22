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
  topic = 'og/107/noise/state';
  value: string;

  constructor(private mqttService: MqttService) {}

  ngOnInit(): void {
    console.log('Hello Word');

    this.mqttService.connect(MQTT_SERVICE_OPTIONS);

    setTimeout(() => {
      this.mqttService.unsafePublish(this.topic, 'gsicht');
    }, 1000);

    this.mqttService.observe(this.topic).subscribe(data => {
      console.log(data.topic + ':');
      console.log()
      this.value = data.payload.toLocaleString().split(',')[0];
    });
  }
}
