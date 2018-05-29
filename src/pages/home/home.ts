import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { Vehiculo } from '../../model/vehiculo/vehiculo.model';
import { VehiculoListService } from '../../service/vehiculo-list.service';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vehiculoList: Observable<Vehiculo[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private vehiculoListService: VehiculoListService) {

    this.vehiculoList = this.vehiculoListService.getVehiculoList()
                        .snapshotChanges()
                        .map(
                          changes => {
                            return changes.map( c=> ({
                              key: c.payload.key, ...c.payload.val()
                            }))
                          }
                        );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}