import {Injectable} from "angular2/core";
import {Http, Response,Headers} from "angular2/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {Restaurante} from "../model/restaurante";

@Injectable()
export class RestauranteService{ 
	constructor(private _http:Http){

	}

	getRestaurantes(){
		//arrow fucntion parameters and statment        (material) => {return material.length};
		//arrow fucntion simply parameters and return 	(material) => material.legth;
		return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurantes")
				.map(res=>{
					console.log(res.json());
					return res.json()});
	}

	getRestaurante(id:string,random=null){
		if(random==null){
			return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurantes/"+id)
				.map(res=>{
					return res.json()
					});	
		}else{
			return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/random-restaurant")
				.map(res=>{
					return res.json()
					});
		}
		
	}

	addRestaurante(restaurante:Restaurante){
		//pasa el objeto a un json string
		let json = JSON.stringify(restaurante);
		let params = json;
		//indicar que en el api rest recibira un post
		let headers = new Headers({"Content-Type":"application/json;charset=UTF-8"});

		return this._http.post("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurante/",params,{headers:headers})
			.map(res=>{
				console.log(res.json());
				return res.json();
				});

	}
	editRestaurante(restaurante:Restaurante){
		//pasa el objeto a un json string
		let json = JSON.stringify(restaurante);
		let params = json;
		let id = restaurante.id;
		//indicar que en el api rest recibira un post
		let headers = new Headers({"Content-Type":"application/json;charset=UTF-8"});

		return this._http.put("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurante/"+id,params,{headers:headers}).map(res=>res.json());

	}
	deleteRestaurante(id:string){
		let headers = new Headers({"Content-Type":"application/json;charset=UTF-8"});
		return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurante/"+id)
				.map(res=>{
					console.log(res.json());
					return res.json()});
	}	
}
