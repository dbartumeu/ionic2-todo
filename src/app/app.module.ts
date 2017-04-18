import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';

import {Projects} from '../providers/projects';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ProjectEditor} from '../pages/project-editor/project-editor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProjectEditor
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '_todoDb',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProjectEditor
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Projects,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
