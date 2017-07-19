import {Component,OnInit} from 'angular2/core';
import {RouteParams,Router} from 'angular2/router';
import {RestauranteService} from '../services/restaurante.service';
import {Restaurante} from '../model/restaurante';

@Component({
	selector:"restaurantes-edit",
	templateUrl:"app/view/restaurante-add.html",
	providers:[RestauranteService]	
})
export class RestauranteEditComponent implements OnInit{
	public titulo:string="editar restaurante";
	public idRestaurant:string;
	public restaurante:Restaurante;
	public errorMessage:string;
	public status:string;
	public messageInput:string="editar restaurante";
	public filesToUpload:Array<File>;
	public resultUpload;
	
	
	constructor(
		private _router:Router,
		private _restauranteService:RestauranteService,
		private _routeParams:RouteParams
	){}
	
	ngOnInit(){
		//necesario Pasar una intancia al formulario en este caso optiene los parametros de routeParams
		this.restaurante =  new Restaurante(
				0,
				this._routeParams.get("nombre"),
				this._routeParams.get("direccion"),
				this._routeParams.get("descripcion"),
				null,
				"bajo"
					
		);
		this.getRestaurante();
	}
	callPrecio(value){
		this.restaurante.precio=value;
	}
	getRestaurante(){
		let id = this._routeParams.get("id");		
		this._restauranteService.getRestaurante(id)
			.subscribe(
				result => {
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
	onSubmit(){
		this._restauranteService.editRestaurante(this.restaurante)
			.subscribe(
				result => {
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
			this._router.navigate(["Home"]);
	}
	fileChangeEvent(fileInput:any){
		this.filesToUpload = <Array<File>> fileInput.target.files;
		this.makeFileRequest("http://localhost:8080/SpringBootCRUDApp/apiv1/upload-file", [],this.filesToUpload).then((result)=>{
				this.resultUpload = result;
				this.restaurante.imagen = this.resultUpload.filename;
				console.log(this.resultUpload.filename);
			}, (error) => {
				console.log(error);
			});
	}
	
	//contruir peticion http con un archivo
	makeFileRequest(url : string, params : Array<string>,files: Array<File>){
		return new Promise( (resolve,reject)=>{
			var formData : any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append("uploads[]", files[i], files[i].name); 
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status==200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			} 
			xhr.open("POST", url ,true);
			xhr.send(formData);
		});
	}

}
