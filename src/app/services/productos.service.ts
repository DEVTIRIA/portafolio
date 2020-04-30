import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Producto } from '../interfaces/producto';
import { ProductoDescripcion } from '../interfaces/producto-descripcion';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  urlFirebase: string = environment.urlFirebase;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  cargando = true;

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {
      this.http.get(`${ this.urlFirebase }/productos_idx.json`)
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });

  }

  getProducto( id: string ) {
    return this.http.get<ProductoDescripcion>(`${ this.urlFirebase }/productos/${ id }.json`);
  }

  buscarProductos( termino: string ) {

    if( this.productos.length === 0 ) {
      // Cargar productos
      this.cargarProductos().then( () => {
        // Ejecutar despues de tener los productos
        // Aplicar el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // Aplicar el filtro
      this.filtrarProductos( termino );
    }

  }


  private filtrarProductos( termino: string ) {

    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    console.log(termino);

    this.productos.forEach( prod => {

      const titulo = prod.titulo.toLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || titulo.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push( prod );
      }
    });

  }
}
