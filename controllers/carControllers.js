import Car from '../model/Car.js';

export async function createCar(req, res) {
    const car = new Car({ ...req.body, user: req.user.id });
    await car.save();
    res.send('Car added');
}

export async function getCars(req, res) {
    const cars = await Car.find({ user: req.user.id });
    res.send(cars);
}

export async function getCar(req, res) {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).send('Car not found');
    res.send(car);
}

export async function updateCar(req, res) {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(car);
}

export async function deleteCar(req, res) {
    await Car.findByIdAndDelete(req.params.id);
    res.send('Car deleted');
}
