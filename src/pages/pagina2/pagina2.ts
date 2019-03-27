import { JsonServerProviderListener } from './../../providers/json-server/json-server';
import { Asignatura } from './../../modelo/asignatura';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Usuario } from '../../modelo/usuario';
import { Nota } from '../../modelo/nota';

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

<<<<<<< HEAD

=======
>>>>>>> 14c1690... ejercicio 4 casi terminado
  usuario:Usuario;
  asignaturaSelec:Asignatura;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertController: AlertController ) {
    this.usuario=navParams.get("usuario");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pagina2Page');
  }

  public verNota(asig:Asignatura){
    this.asignaturaSelec=asig;
  }

  public addNota(asig:Asignatura, indice:number){
    //obtenemos la fecha actual
    let fecha:string=new Date().toLocaleDateString();

    console.log(fecha);
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
            let usrAux:Usuario=this.usuario;
            usrAux.asignaturas[indice].notas.push(new Nota(data.fecha, data.nota))
            console.log('Confirm Ok');
          }
        }
      ]
    });

    alert.present();
  }

<<<<<<< HEAD
<<<<<<< HEAD
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

=======
>>>>>>> 0eb1014... resolución problema en página2.ts
  onAddNotaResponse(alumno:Usuario, error:string){
    
  }

<<<<<<< HEAD
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

=======
>>>>>>> 14c1690... ejercicio 4 casi terminado
=======
>>>>>>> 0eb1014... resolución problema en página2.ts
}
