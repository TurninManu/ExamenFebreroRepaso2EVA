import { JsonServerProviderListener, JsonServerProvider } from './../../providers/json-server/json-server';
import { Asignatura } from './../../modelo/asignatura';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Usuario } from '../../modelo/usuario';
import { Nota } from '../../modelo/nota';
import { DatePipe } from '@angular/common';

/**
 * Generated class for the Pagina2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagina2',
  templateUrl: 'pagina2.html',
})
export class Pagina2Page implements JsonServerProviderListener{

  usuario:Usuario;
  asignaturaSelec:Asignatura;


  constructor(public navCtrl: NavController, public navParams: NavParams, public jsonserverprovider:JsonServerProvider, public alertController: AlertController, public toastController:ToastController, public datepipe: DatePipe ) {
    this.usuario=navParams.get("usuario");
    this.jsonserverprovider.setListener(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
  }

  public verNota(asig:Asignatura){
    this.asignaturaSelec=asig;
  }

  public addNota(asig:Asignatura, indice:number){
    //obtenemos la fecha actual.
    let date=new Date().toDateString();
    //datepipe nos transforma la fecha al formato indicado (tenemos que añadirlo al constructor y a providers en app.module.ts)
    let fecha:string =this.datepipe.transform(date, 'yyyy-MM-dd');

    const alert =  this.alertController.create({
      title: asig.asignatura,
      inputs: [
        {
          name: 'nota',
          type: 'number',
          max: 10,
          min: 0,
          placeholder: 'nota'
        },
        {
          name: 'fecha',
          type: 'date',
          value: fecha
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.usuario.asignaturas[indice].notas.push(new Nota(data.fecha, data.nota))
            this.jsonserverprovider.addNota(this.usuario);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    alert.present();
  }

  borrarNota(indice:number){
    const alert =  this.alertController.create({
      title: '¿Seguro que desea eliminar la nota?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sí',
          handler: () => {
            this.asignaturaSelec.notas.splice(indice, 1);
            this.jsonserverprovider.deleteNota(this.usuario);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    alert.present();
  }


  onAddNotaResponse(alumno:Usuario, error:string){
    if(error==null){
      //se añade la nota
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
    
  }

  ondeleteNotaResponse(alumno:Usuario, error:string){
    if(error==null){
      //se borra la nota
    }else{
      const toast = this.toastController.create({
        message: error,
        duration: 2000
      });
      toast.present();
    }
    
  }

  
}
