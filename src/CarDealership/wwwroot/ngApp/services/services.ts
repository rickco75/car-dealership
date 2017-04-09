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

//namespace CarDealership.Services {

//    export class MovieService {
//        private MovieResource;

//        public listMovies() {
//            return this.MovieResource.query();
//        }

//        constructor($resource: ng.resource.IResourceService) {
//            this.MovieResource = $resource('/api/movies');
//        }
//    }

//    export class CarService {
//        private carsResource;
//        private makesResource;

//        public listCars() {
//            return this.carsResource.query();
//        }

//        public listMakes() {
//            return this.makesResource.query();
//        }

//        public getCar(id: string) {
//            this.carsResource.get({id: id})
//        }

//        public getMake(id: string) {
//            this.makesResource.get({ id: id})
//        }

//        constructor($resource: ng.resource.IResourceService) {
//            this.carsResource = $resource('/api/cars/:id');
//            this.makesResource = $resource('/api/makes/:id');
//        }

//    }
//    angular.module('CarDealership').service('carService', CarService);

//}
