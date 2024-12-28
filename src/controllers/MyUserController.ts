import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return; // Ensure no further processing occurs
    }

    res.json(currentUser);
  } catch (error) {
    console.error(error);
    next(error); // Pass error to next middleware
  }
};

const createCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).send(); // User already exists
      return; // Ensure no further processing occurs
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error(error);
    next(error); // Pass error to next middleware
  }
};

const updateCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return; // Ensure no further processing occurs
    }

    user.name = name;
    user.addressLine1 = addressLine1;
    user.city = city;
    user.country = country;

    await user.save();

    res.json(user); // Return updated user
  } catch (error) {
    console.error(error);
    next(error); // Pass error to next middleware
  }
};

export default {
  createCurrentUser,
  updateCurrentUser,
  getCurrentUser,
};
