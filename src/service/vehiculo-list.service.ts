import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Vehiculo } from '../model/vehiculo/vehiculo.model';

@Injectable()
export class VehiculoListService{

    private VehiculoListRef = this.db.list<Vehiculo>('Vehiculos-list');

    constructor(private db: AngularFireDatabase){}

    getVehiculoList(){
        return this.VehiculoListRef;
    }

    addVehiculo(Vehiculo: Vehiculo){
        return this.VehiculoListRef.push(Vehiculo);
    }

    updateVehiculo(Vehiculo: Vehiculo){
        return this.VehiculoListRef.update(Vehiculo.key, Vehiculo);
    }

    removeVehiculo(Vehiculo: Vehiculo){
        return this.VehiculoListRef.remove(Vehiculo.key);
    }
}