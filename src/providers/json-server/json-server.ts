import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/usuario';


@Injectable()
export class JsonServerProvider {
  URL="http://localhost:3000/";
  listenerLogin:JsonServerProviderListenerLogin
  listener:JsonServerProviderListener

  constructor(public http: HttpClient) {
    console.log('Hello JsonServerProvider Provider');
  }

  setListenerLogin(listener:JsonServerProviderListenerLogin){
    this.listenerLogin=listener;
  }

  setListener(listener:JsonServerProviderListener){
    this.listener=listener;
  }

  getUsuario(usuario:string, contrasenna:string){
    this.http.get(this.URL+"alumnos?usuario="+usuario+"&clave="+contrasenna).subscribe(
    data=>{
      this.listenerLogin.onGetUsuarioResponse(data[0],null);
    },
    _error=>{
      this.listenerLogin.onGetUsuarioResponse(null,"ERROR AL INICIAR SESIÓN");
      console.log("ERROR getUsuario en json-server.ts");
    }
    );
  }

  addNota(alumno:Usuario){
<<<<<<< HEAD
    this.actualizarNota(alumno, 0);
  }

  deleteNota(alumno:Usuario){
    this.actualizarNota(alumno, 1);
  }

  actualizarNota(alumno:Usuario, opcion:number){
=======
>>>>>>> 14c1690... ejercicio 4 casi terminado
    let data=JSON.stringify(alumno);
    let header={"headers":{"Content-Type":"application/json"}};
    return new Promise(resolve=>{
      this.http.put(this.URL+"alumnos/"+alumno.id,data,header)
      .subscribe(
          data=>{
              resolve(data['_body']);
<<<<<<< HEAD
              if(opcion==0){
                this.listener.onAddNotaResponse(alumno,null);
              }else{
                this.listener.ondeleteNotaResponse(alumno,null);
              }
          },_error=>{
            //si opcion es 0 se trata de una operación de añadir, si es 1 se trata de borrar
              if(opcion==0){
                this.listener.onAddNotaResponse(null,"ERROR al añadir la nota: "+_error);
                console.log("ERROR al añadir la nota: "+_error);
              }else
                this.listener.ondeleteNotaResponse(null,"ERROR al borrar la nota: "+_error);
                console.log("ERROR al borrar la nota: "+_error);
          }
      );
  }).catch(err=>{
      console.log("ERROR: actualizando la nota en actualizarNota() de json-server.ts");
      
  })

  }
=======
              this.listener.onAddNotaResponse(alumno,null);
          },_error=>{
              this.listener.onAddNotaResponse(null,"ERROR al añadir la persona: "+_error);
              console.log("ERROR al añadir la persona: "+_error);
          }
      );
  }).catch(err=>{
      console.log("ERROR: añadiendo la nota en addNota() de json-server.ts");
      
  })
  }
  
>>>>>>> 14c1690... ejercicio 4 casi terminado
}

export interface JsonServerProviderListenerLogin{
  onGetUsuarioResponse(usuario:Usuario, error:string)
}

export interface JsonServerProviderListener{
  onAddNotaResponse(alumno:Usuario, error:string)
<<<<<<< HEAD
  ondeleteNotaResponse(alumno:Usuario, error:string)
=======
>>>>>>> 14c1690... ejercicio 4 casi terminado
}
