import Car from "../model/Car.js";

export async function createCar(req, res) {
  const { title, description, tags, images } = req.body; // images are URLs now

  try {
    const newCar = new Car({
      title,
      description,
      tags: tags.split(", "),
      images,
    });
    await newCar.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).json({ message: "Error creating car", error });
  }
}

export async function getCars(req, res) {
  const cars = await Car.find({ user: req.user.id });
  res.send(cars);
}

export async function getCar(req, res) {
  const car = await Car.findById(req.params.id);
  if (!car) return res.status(404).send("Car not found");
  res.send(car);
}

export async function updateCar(req, res) {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(car);
}

export async function deleteCar(req, res) {
  await Car.findByIdAndDelete(req.params.id);
  res.send("Car deleted");
}
