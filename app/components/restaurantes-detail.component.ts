import {Component,OnInit} from 'angular2/core';
import {RouteParams,Router} from 'angular2/router';
import {RestauranteService} from '../services/restaurante.service';
import {Restaurante} from '../model/restaurante';

@Component({
	selector:"restaurantes-detail",
	templateUrl:"app/view/restaurantes-detail.html",
	providers:[RestauranteService]	
})
export class RestauranteDetailComponent implements OnInit{
	public restaurante:Restaurante;
	public errorMessage:string;
	public status:string;
	constructor(
		private _router:Router,
		private _restauranteService:RestauranteService,
		private _routeParams:RouteParams
	){}
	
	ngOnInit(){
		this.getRestaurante();
	}
	getRestaurante(){
		let idRestaurant = this._routeParams.get("id");
		let random = this._routeParams.get("random");

		//let id = this._routeParams.get("id");
		this._restauranteService.getRestaurante(idRestaurant,random)
			.subscribe(
				result => {
					console.log(result);
					this.restaurante=result.data;
					this.status=result.status;
					if(this.status!="success"){
						this._router.navigate(["Home"]);
						alert("error en el servidor");
					}					
				},
				error=>{
					this.errorMessage = <any>error;
					if(this.errorMessage!==null){
						console.log("error en la peticion");						
					}
				}									
			);
	}
}