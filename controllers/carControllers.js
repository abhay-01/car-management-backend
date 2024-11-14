import Car from '../model/Car.js';

export async function createCar (req,res){
    const { title, description, tags } = req.body;
  const imageFiles = req.files.map(file => file.path); 

  try {
    const newCar = new Car({
      title,
      description,
      tags: tags.split(', '),
      images: imageFiles,
    });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Error creating car", error });
  }
};

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
