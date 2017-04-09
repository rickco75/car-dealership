namespace CarDealer.Controllers {

    export class HomeController {
        //public message = 'Hello from the home page!';
        public cars;
        public makes; //for later
        public selectedMake = 0;
        public selectedModel;


        constructor(private carService: CarDealer.Services.CarService, private makeService: CarDealer.Services.MakeService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.cars = carService.listCars();
            this.makes = makeService.listMakes();

        }

        public getCars() {
            if (this.selectedMake == 0)
                return this.cars
            else
                return this.cars.filter(x => x.carMakeId == this.selectedMake);
        }

        public showModal(carId) {

            showModalUI(carId, this.$uibModal, this.cars, this.makes)
        }
    }


    class DialogController {

        public ok() {
            this.$uibModalInstance.close();
        }

        constructor(public make: string, public car: object, private $uibModalInstance: angular.ui.bootstrap.IModalServiceInstance) { }
    }

    angular.module('CarDealer').controller('DialogController', DialogController);

    //one error was bugging me, i did some research on stackoverflow
    //http://stackoverflow.com/questions/41063947/angular-1-6-0-possibly-unhandled-rejection-error
    //each time i click outside the modal ui, there were one error message in the console log stating:
    //'Possibly unhandled rejection: backdrop click
    //the below piece of code fixes it.
    angular.module('CarDealer').config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    const apiUrl = '/api/cars/search/';

    export class AboutUsController {
        public message = 'Hello from the about page!';
    }

    export class AboutController {
        //public message = 'Hello from the about page!';
        public cars;
        public makes;
        public search;


        fetch() {
            if (this.search) {
                this.$http.get(apiUrl + this.search)
                    .then(res => {
                        this.cars = res.data;
                    });
            }
        }

        public showModal(carId) {
            showModalUI(carId, this.$uibModal, this.cars, this.makes)
        }

        constructor(private makeService: CarDealer.Services.MakeService, private $http: ng.IHttpService, private $uibModal: angular.ui.bootstrap.IModalService) {
            this.makes = makeService.listMakes();
        }
    }

    export function showModalUI(carId: number, $uibModal: angular.ui.bootstrap.IModalService, cars, makes) {

        let car = cars.find(x => x.id == carId);
        let make = makes.find(x => x.id == car.carMakeId);

        //console.log(make);

        $uibModal.open({
            templateUrl: '/ngApp/views/modal.html',
            controller: 'DialogController',
            controllerAs: 'modal',
            resolve: {
                car: () => car,
                make: () => make.name
            },
            size: 'lg'
        });
    }

}

//namespace CarDealership.Controllers {

//    export class HomeController {
//        public makes;
//        public cars;

//        //public carSlides: CarSlide[];

//        constructor(private carService: CarDealership.Services.CarService, private $uibModal: ng.ui.bootstrap.IModalService) {

//            this.carService = carService.listCars();

//            this.makes = carService.listMakes();
//        }

//        public showModal(car) {
//            this.$uibModal.open(
//                {
//                    controller: ModalController,
//                    controllerAs: 'modal',
//                    templateUrl: '/ngApp/views/modal.html',
//                    size: 'md',
//                    resolve: {
//                        car: car
//                    }
//                });
//        }
//    }

//    class ModalController {
//        constructor(private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, public car) { }

//        public ok() {
//            this.$uibModalInstance.close();
//        }
//    }

//    angular.module('CarDealership').controller('homeController', HomeController);
//    angular.module('CarDealership').controller('modalController', ModalController)

//}
