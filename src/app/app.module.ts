import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { VehiculoListService } from './../service/vehiculo-list.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCdgb4Gyn7pFDCahbOV4AcDhAr4hSXVnAE",
      authDomain: "concesionario-e58ea.firebaseapp.com",
      databaseURL: "https://concesionario-e58ea.firebaseio.com",
      projectId: "concesionario-e58ea",
      storageBucket: "concesionario-e58ea.appspot.com",
      messagingSenderId: "179035316970"
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    File,
    Transfer,
    FilePath,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    VehiculoListService
  ]
})
export class AppModule {}
