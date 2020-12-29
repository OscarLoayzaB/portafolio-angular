import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();

   }

  private cargarProductos(){

    this.http.get("https://angular-html-1a146-default-rtdb.firebaseio.com/productos_idx.json")
      .subscribe(( resp: ProductoInterface[]) => {
        console.log(resp);
        this.productos=resp;
        this.cargando=false;

        // setTimeout(() => {
        //   this.cargando = false;

        // },2000)

      });

  }
}