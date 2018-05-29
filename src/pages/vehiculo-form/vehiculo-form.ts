import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from "ionic-angular";

// import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
// import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { Vehiculo } from '../../model/vehiculo/vehiculo.model';
import { VehiculoListService } from '../../service/vehiculo-list.service';

declare var cordova:any;

@IonicPage()
@Component({
  selector: 'page-vehiculo-form',
  templateUrl: 'vehiculo-form.html',
})
export class VehiculoFormPage {

  vehiculo: Vehiculo = {
    marca: '',
    cilindraje: null,
    serial: '',
    color: '',
    modelo: '',
    foto: null
  };

  loading: Loading;

  titulo = 'Nuevo Vehiculo';
  flagButton = false;

  constructor(public navCtrl: NavController,
            public navParams: NavParams, 
            private vehiculoListService: VehiculoListService,
            private camera: Camera,
            private transfer: Transfer,
            // private filePath: FilePath,
            // private file: File,
            public actionSheetCtrl: ActionSheetController,
            public toastCtrl: ToastController,
            public platform: Platform,
            public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    var tempVehiculo = this.navParams.get("vehiculo");
    if(tempVehiculo !== null && tempVehiculo !== undefined){
      this.vehiculo = tempVehiculo;
      this.titulo   = "Editar Vehiculo";
      this.flagButton = true;
    }
  }

  addVehiculo(vehiculo: Vehiculo){
    this.vehiculoListService.addVehiculo(vehiculo)
    .then(ref => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  updateVehiculo(vehiculo: Vehiculo){
    this.vehiculoListService.updateVehiculo(vehiculo)
    .then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  removeVehiculo(vehiculo: Vehiculo){
    this.vehiculoListService.removeVehiculo(vehiculo)
    .then(() => {
      this.navCtrl.setRoot('HomePage');
    })
  }

  public presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Seleccionar fuente de imagen',
      buttons: [
      // {
      //   text: 'Load from Library',
      //   handler: () => {
      //     this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
      //   }
      // }, 
      {
        text: 'Camara',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      }, {
        text: 'Cancelar',
        role: 'Cancel'
      }]
    });

    actionSheet.present();
  }

  public takePicture(sourceType){

    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      // sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get te data of an image
    this.camera.getPicture(options).then((imageData) => {

      this.vehiculo.foto = 'data:image/jpeg;base64,' + imageData;

      document.getElementById('foto').setAttribute( 'src', this.vehiculo.foto);

      // Special handling for Android Library
      // if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
      //   this.filePath.resolveNativePath(imageData)
      //     .then(filePath => {
      //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      //       let currentName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.lastIndexOf('?'));
      //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      //     });
      // }else{
      //   var currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
      //   var correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
      //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      // }
    }, (err) => {
      this.presentToast("Error while selecting image");
    });
  }

  // Helper methods for our image capturing process

  // Create a new name for the image
  // private createFileName(){
  //   var d = new Date();
  //   var n = d.getDate();
  //   var newFileName = n + ".jpg";
  //   return newFileName;
  // }

  // Copy the image to a local folder
  // private copyFileToLocalDir(namePath, currentName, newFileName){
  //   this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
  //     .then(success => {
  //       this.vehiculo.foto = newFileName;
  //     }, error => {
  //       this.presentToast('Error while storing file');
  //     })
  // }

  private presentToast(text){
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img){
    if(img == null){
      return '';
    }else{
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage(){

    // Destination URL
    var url = "http://yoururl/upload.php";

    // File for Upload
    var targetPath = this.pathForImage(this.vehiculo.foto);

    // File name only
    var fileName = this.vehiculo.foto;

    var options = {
      fileKey: "file",
      fileName: fileName,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {"fileName": fileName}
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: "Uploading....."
    });

    //Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options)
      .then(data => {
        this.loading.dismissAll();
        this.presentToast("Image successful uploaded");
      }, err => {
        this.loading.dismissAll();
        this.presentToast("Error while uploading file.");
      })
  }

}
