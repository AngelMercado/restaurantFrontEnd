System.register(['angular2/core', 'angular2/router', '../services/restaurante.service'], function(exports_1, context_1) {
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
    var core_1, router_1, restaurante_service_1;
    var RestauranteDetailComponent;
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
            }],
        execute: function() {
            RestauranteDetailComponent = (function () {
                function RestauranteDetailComponent(_router, _restauranteService, _routeParams) {
                    this._router = _router;
                    this._restauranteService = _restauranteService;
                    this._routeParams = _routeParams;
                }
                RestauranteDetailComponent.prototype.ngOnInit = function () {
                    this.getRestaurante();
                };
                RestauranteDetailComponent.prototype.getRestaurante = function () {
                    var _this = this;
                    var idRestaurant = this._routeParams.get("id");
                    var random = this._routeParams.get("random");
                    //let id = this._routeParams.get("id");
                    this._restauranteService.getRestaurante(idRestaurant, random)
                        .subscribe(function (result) {
                        console.log(result);
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
                RestauranteDetailComponent = __decorate([
                    core_1.Component({
                        selector: "restaurantes-detail",
                        templateUrl: "app/view/restaurantes-detail.html",
                        providers: [restaurante_service_1.RestauranteService]
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, restaurante_service_1.RestauranteService, router_1.RouteParams])
                ], RestauranteDetailComponent);
                return RestauranteDetailComponent;
            }());
            exports_1("RestauranteDetailComponent", RestauranteDetailComponent);
        }
    }
});
//# sourceMappingURL=restaurantes-detail.component.js.map