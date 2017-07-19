// Importar el núcleo de Angular
import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES,RouteConfig,Router,RouteParams} from 'angular2/router';
import {RestaurantesListComponent} from './components/restaurantes-list.component';
import {RestauranteDetailComponent} from './components/restaurantes-detail.component';
import {RestauranteAddComponent} from './components/restaurante-add.component';
import {RestauranteEditComponent} from './components/restaurante-edit.component';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'my-app',
    templateUrl:'app/view/home.html',
    directives:[ROUTER_DIRECTIVES,RestaurantesListComponent]
    //template: '<h1>{{titulo}}</h1> <ul><li>{{pelicula}}</li><li>{{director}}</li><li>{{anio}}</li></ul>'
})
@RouteConfig([
	{path:'/', name:'Home',component: RestaurantesListComponent,useAsDefault:true},
	{path:'/restaurante/:id',name:"Restaurante",component:RestauranteDetailComponent},
	{path:'/crear-restaurante/',name:"CrearRestaurante",component:RestauranteAddComponent},
	{path:'/editar-restaurante/:id',name:"EditarRestaurante",component:RestauranteEditComponent},
	{path:'/donde-como-hoy/:random',name:"DondeComoHoy",component:RestauranteDetailComponent}
])

// Clase del componente donde iran los datos y funcionalidades
export class AppComponent { 
	public titulo:string = "Restaurantes en la ciudad";
}