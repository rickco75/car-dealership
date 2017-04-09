namespace CarDealer.Services {

    export class CarService {
        private CarResource;

        public listCars() {
            return this.CarResource.query();
        }

        public getCar(id) {
            return this.CarResource.get({ id: id });
        }

        constructor($resource: ng.resource.IResourceService) {
            this.CarResource = $resource('/api/cars/:id');
        }
    }

    angular.module('CarDealer').service('carService', CarService);


    export class MakeService {
        private MakeResource;

        public listMakes() {
            return this.MakeResource.query();
        }

        public getMake(id) {
            return this.MakeResource.get({ id: id });
        }

        constructor($resource: ng.resource.IResourceService) {
            this.MakeResource = $resource('/api/makes/:id');
        }
    }

    angular.module('CarDealer').service('makeService', MakeService);

}