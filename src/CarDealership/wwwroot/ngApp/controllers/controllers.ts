namespace CarDealer.Controllers {

    export class HomeController {
        public cars;
        public makes;
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


    angular.module('CarDealer').config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);

    const apiUrl = '/api/cars/search/';

    export class AboutUsController {
        public message = 'Hello from the about page!';
    }

    export function showModalUI(carId: number, $uibModal: angular.ui.bootstrap.IModalService, cars, makes) {

        let car = cars.find(x => x.id == carId);
        let make = makes.find(x => x.id == car.carMakeId);

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