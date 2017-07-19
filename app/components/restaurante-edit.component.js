System.register(['angular2/core', 'angular2/router', '../services/restaurante.service', '../model/restaurante'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, restaurante_service_1, restaurante_1;
    var RestauranteEditComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (restaurante_service_1_1) {
                restaurante_service_1 = restaurante_service_1_1;
            },
            function (restaurante_1_1) {
                restaurante_1 = restaurante_1_1;
            }],
        execute: function() {
            RestauranteEditComponent = (function () {
                function RestauranteEditComponent(_router, _restauranteService, _routeParams) {
                    this._router = _router;
                    this._restauranteService = _restauranteService;
                    this._routeParams = _routeParams;
                    this.titulo = "editar restaurante";
                    this.messageInput = "editar restaurante";
                }
                RestauranteEditComponent.prototype.ngOnInit = function () {
                    //necesario Pasar una intancia al formulario en este caso optiene los parametros de routeParams
                    this.restaurante = new restaurante_1.Restaurante(0, this._routeParams.get("nombre"), this._routeParams.get("direccion"), this._routeParams.get("descripcion"), null, "bajo");
                    this.getRestaurante();
                };
                RestauranteEditComponent.prototype.callPrecio = function (value) {
                    this.restaurante.precio = value;
                };
                RestauranteEditComponent.prototype.getRestaurante = function () {
                    var _this = this;
                    var id = this._routeParams.get("id");
                    this._restauranteService.getRestaurante(id)
                        .subscribe(function (result) {
                        _this.restaurante = result.data;
                        _this.status = result.status;
                        if (_this.status != "success") {
                            _this._router.navigate(["Home"]);
                            alert("error en el servidor");
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage !== null) {
                            console.log("error en la peticion");
                        }
                    });
                };
                RestauranteEditComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this._restauranteService.editRestaurante(this.restaurante)
                        .subscribe(function (result) {
                        _this.restaurante = result.data;
                        _this.status = result.status;
                        if (_this.status != "success") {
                            _this._router.navigate(["Home"]);
                            alert("error en el servidor");
                        }
                    }, function (error) {
                        _this.errorMessage = error;
                        if (_this.errorMessage !== null) {
                            console.log("error en la peticion");
                        }
                    });
                    this._router.navigate(["Home"]);
                };
                RestauranteEditComponent.prototype.fileChangeEvent = function (fileInput) {
                    var _this = this;
                    this.filesToUpload = fileInput.target.files;
                    this.makeFileRequest("http://localhost:8080/SpringBootCRUDApp/apiv1/upload-file", [], this.filesToUpload).then(function (result) {
                        _this.resultUpload = result;
                        _this.restaurante.imagen = _this.resultUpload.filename;
                        console.log(_this.resultUpload.filename);
                    }, function (error) {
                        console.log(error);
                    });
                };
                //contruir peticion http con un archivo
                RestauranteEditComponent.prototype.makeFileRequest = function (url, params, files) {
                    return new Promise(function (resolve, reject) {
                        var formData = new FormData();
                        var xhr = new XMLHttpRequest();
                        for (var i = 0; i < files.length; i++) {
                            formData.append("uploads[]", files[i], files[i].name);
                        }
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    resolve(JSON.parse(xhr.response));
                                }
                                else {
                                    reject(xhr.response);
                                }
                            }
                        };
                        xhr.open("POST", url, true);
                        xhr.send(formData);
                    });
                };
                RestauranteEditComponent = __decorate([
                    core_1.Component({
                        selector: "restaurantes-edit",
                        templateUrl: "app/view/restaurante-add.html",
                        providers: [restaurante_service_1.RestauranteService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, restaurante_service_1.RestauranteService, router_1.RouteParams])
                ], RestauranteEditComponent);
                return RestauranteEditComponent;
            }());
            exports_1("RestauranteEditComponent", RestauranteEditComponent);
        }
    }
});
//# sourceMappingURL=restaurante-edit.component.js.map