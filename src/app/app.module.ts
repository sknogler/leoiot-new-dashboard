import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';

import { Og107Component } from './og107/og107.component';
import { Ugk03Component } from './ugk03/ugk03.component';
import { Ugk04Component } from './ugk04/ugk04.component';
import { RoomComponent } from './room/room.component';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  protocol: 'ws',
};

@NgModule({
  declarations: [
    AppComponent,
    Og107Component,
    Ugk03Component,
    Ugk04Component,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    RouterModule.forRoot([
      {path: 'og107', component: Og107Component},
      {path: 'ugk03', component: Ugk03Component},
      {path: 'ugk04', component: Ugk04Component},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
