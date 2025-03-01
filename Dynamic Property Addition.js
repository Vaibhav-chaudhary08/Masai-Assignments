function createCar(make, model, year) {
    return {
        make: make,
        model: model,
        year: year,
        describeCar: function() {
            console.log(`This car is a ${year} ${make} ${model}.`);
        }
    };
}

const car = createCar("Toyota", "Camry", 2022);
car.describeCar();

const car2 = createCar("Honda", "Civic", 2023);
car2.describeCar(); 

const car3 = createCar("Tesla", "Model S", 2021);
car3.describeCar();
