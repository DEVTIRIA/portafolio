import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  id: string;
  producto: ProductoDescripcion;

  constructor(private router: ActivatedRoute,
              private _producServ: ProductosService ) {}

  ngOnInit(): void {
    this.router.params
                .subscribe( params => {
                  this._producServ.getProducto( params['id'] )
                                  .subscribe( producto => {
                                    this.id = params['id'];
                                    this.producto = producto;
                                  });
                });
  }

}
