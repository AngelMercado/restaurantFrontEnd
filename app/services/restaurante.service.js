System.register(["angular2/core", "angular2/http", "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, http_1;
    var RestauranteService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            RestauranteService = (function () {
                function RestauranteService(_http) {
                    this._http = _http;
                }
                RestauranteService.prototype.getRestaurantes = function () {
                    //arrow fucntion parameters and statment        (material) => {return material.length};
                    //arrow fucntion simply parameters and return 	(material) => material.legth;
                    return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurantes")
                        .map(function (res) {
                        console.log(res.json());
                        return res.json();
                    });
                };
                RestauranteService.prototype.getRestaurante = function (id, random) {
                    if (random === void 0) { random = null; }
                    if (random == null) {
                        return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurantes/" + id)
                            .map(function (res) {
                            return res.json();
                        });
                    }
                    else {
                        return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/random-restaurant")
                            .map(function (res) {
                            return res.json();
                        });
                    }
                };
                RestauranteService.prototype.addRestaurante = function (restaurante) {
                    //pasa el objeto a un json string
                    var json = JSON.stringify(restaurante);
                    var params = json;
                    //indicar que en el api rest recibira un post
                    var headers = new http_1.Headers({ "Content-Type": "application/json;charset=UTF-8" });
                    return this._http.post("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurante/", params, { headers: headers })
                        .map(function (res) {
                        console.log(res.json());
                        return res.json();
                    });
                };
                RestauranteService.prototype.editRestaurante = function (restaurante) {
                    //pasa el objeto a un json string
                    var json = JSON.stringify(restaurante);
                    var params = json;
                    var id = restaurante.id;
                    //indicar que en el api rest recibira un post
                    var headers = new http_1.Headers({ "Content-Type": "application/json;charset=UTF-8" });
                    return this._http.put("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurante/" + id, params, { headers: headers }).map(function (res) { return res.json(); });
                };
                RestauranteService.prototype.deleteRestaurante = function (id) {
                    var headers = new http_1.Headers({ "Content-Type": "application/json;charset=UTF-8" });
                    return this._http.get("http://localhost:8080/SpringBootCRUDApp/apiv1/restaurante/" + id)
                        .map(function (res) {
                        console.log(res.json());
                        return res.json();
                    });
                };
                RestauranteService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], RestauranteService);
                return RestauranteService;
            }());
            exports_1("RestauranteService", RestauranteService);
        }
    }
});
//# sourceMappingURL=restaurante.service.js.map