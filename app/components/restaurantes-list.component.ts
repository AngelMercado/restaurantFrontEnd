// Importar el núcleo de Angular
import {Component,OnInit} from 'angular2/core';
import {ROUTER_DIRECTIVES,RouteConfig,Router,RouteParams} from 'angular2/router';
import {RestauranteService} from '../services/restaurante.service'
import {Restaurante} from '../model/restaurante';

 
// Decorador component, indicamos en que etiqueta se va a cargar la plantilla
@Component({
    selector: 'restaurantes-list',
    templateUrl:'app/view/restaurantes-list.html',
    directives:[ROUTER_DIRECTIVES],
    providers:[RestauranteService]
    //template: '<h1>{{titulo}}</h1> <ul><li>{{pelicula}}</li><li>{{director}}</li><li>{{anio}}</li></ul>'
})


// Clase del componente donde iran los datos y funcionalidades
export class RestaurantesListComponent implements OnInit{ 
	public titulo:string = "Listado de restaurantes";
	public restaurantes:Restaurante[];
	public status:string;
	public errorMessage:string;
	public confirmado:string;
	constructor(private _restauranteService:RestauranteService){

	}
	ngOnInit(){
		this.getRestaurantes();
		console.log("los restaurantes ya se han cargado");
	}
	getRestaurantes(){
		let box_restaurantes = <HTMLElement>document.querySelector("#restaurantes-list .loading");
		box_restaurantes.style.visibility="visible";
		this._restauranteService.getRestaurantes()
								.subscribe(
									result => {
										this.restaurantes=result.data;
										this.status=result.status;
										if(this.status!="success"){
											alert("error en el servidor");
										}
										box_restaurantes.style.display="none";
									},
									error=>{
										this.errorMessage = <any>error;
										if(this.errorMessage!==null){
											console.log("error en la peticion");											
										}
									}									
								);
	}
	onBorrarRestaurante(id:string){

		this._restauranteService.deleteRestaurante(id)
								.subscribe(
									result => {										
										this.status=result.status;
										if(this.status!="success"){
											alert("error en el servidor");
										}							
										this.getRestaurantes();			
									},
									error=>{
										this.errorMessage = <any>error;
										if(this.errorMessage!==null){
											console.log("error en la peticion");
											console.log(this.errorMessage);									
										}
									}									
								);
	}
	onConfirmar(id:string){
		this.confirmado = id;

	}
	onCancelar(id:string){
		this.confirmado= null;
	}

}