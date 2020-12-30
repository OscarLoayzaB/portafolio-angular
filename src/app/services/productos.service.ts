import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrado: ProductoInterface[] = [];

  constructor( private http: HttpClient) {

    this.cargarProductos();

   }

  private cargarProductos(){

    //trabajar en base a Promesas, ejecutar cierto codigo hasta que esto se resuelva.
    return new Promise( (resolve, reject ) => {

      this.http.get("https://angular-html-1a146-default-rtdb.firebaseio.com/productos_idx.json")
      .subscribe(( resp: ProductoInterface[]) => {
        this.productos=resp;
        this.cargando=false;

        // setTimeout(() => {
        //   this.cargando = false;

        // },2000)

        resolve();

      });

    })



  }

  getProducto( id: string ){
    return this.http.get(`https://angular-html-1a146-default-rtdb.firebaseio.com/productos/${ id }.json`);

  }

  buscarProducto( termino: string) {

    if (this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // esto se va a ejecutar despyes de tener los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      } )
    }
    else{
      // aplicar el filtro
      this.filtrarProductos( termino );
    }


    // console.log( this.productosFiltrado );
  }


  private filtrarProductos( termino: string) {
    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod=> {

     const titulolower = prod.titulo.toLocaleLowerCase();
      if (prod.categoria.indexOf( termino ) >= 0 || titulolower.indexOf( termino ) >= 0){
          this.productosFiltrado.push( prod );
      }


    });

    /*
    this.productosFiltrado = this.productos.filter( producto => {
      return true;
    });
    */

  }
}
