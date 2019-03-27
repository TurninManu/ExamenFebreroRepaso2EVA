import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../modelo/usuario';


@Injectable()
export class JsonServerProvider {
  URL="http://localhost:8080/";
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
    let data=JSON.stringify(alumno);
    let header={"headers":{"Content-Type":"application/json"}};
    return new Promise(resolve=>{
      this.http.post(this.URL+"alumnos/"+alumno.id,data,header)
      .subscribe(
          data=>{
              resolve(data['_body']);
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
  
}

export interface JsonServerProviderListenerLogin{
  onGetUsuarioResponse(usuario:Usuario, error:string)
}

export interface JsonServerProviderListener{
  onAddNotaResponse(alumno:Usuario, error:string)
}
