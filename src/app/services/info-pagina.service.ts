import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina, Equipo } from '../interfaces/info-pagina';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  urlFirebase: string = environment.urlFirebase;
  info: InfoPagina = {};
  equipo: Equipo[] = [];

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    this.http.get( 'assets/data/data-pagina.json' )
              .subscribe( (resp: InfoPagina) => {
                this.info = resp;
              });
  }


  private cargarEquipo() {
    this.http.get( `${ this.urlFirebase }/equipo.json` )
              .subscribe( (resp: Equipo[]) => {
                this.equipo = resp;
              });
  }
}
