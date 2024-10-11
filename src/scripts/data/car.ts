type CarDetails = {
  brand: string;
  model: string;
}

type RaceCarDetails = {
  brand: string;
  model: string;
  acceleration: number;
}

class Car {
  #brand: string;
  #model: string;
  speed: number = 0;
  isTrunkOpen: boolean = false;

  constructor(carDetails: CarDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo(): void {
    const trunkStatus: string = this.isTrunkOpen ? 'trunk open' : 'trunk closed';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, ${trunkStatus}`);
  }


  go(): void {
    if (!this.isTrunkOpen) {
      this.speed = Math.min(200, this.speed + 5);
    }
  }

  brake(): void {
    this.speed = Math.max(0, this.speed - 5);
  }

  openTrunk(): void {
    if (this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(): void {
    this.isTrunkOpen = false;
  }
}

class RaceCar extends Car {
  acceleration: number;

  constructor(carDetails: RaceCarDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(): void {
    if (!this.isTrunkOpen) {
      this.speed = Math.min(300, this.speed + this.acceleration);
    }
  }

  openTrunk(): void {
    console.log('Race cars dont have a trunk.');
  }

  closeTrunk(): void {
    console.log('Race cars dont have a trunk.');
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});
const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});
const raceCar1 = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
})

car1.go()
car1.go()
car1.go()
car1.brake()

car2.openTrunk();

car1.displayInfo()
car2.displayInfo()

raceCar1.brake();
raceCar1.openTrunk();
raceCar1.displayInfo();