import user from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import env from "../config/config.js";

//Get the email and password field from the body, check if there is another existing email
//create the user (the model already have hook that hash the password)
//only return the id and email of the user
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isRepeated = await user.findOne({
      where: { email },
    });
    if (isRepeated) {
      res.status(400).json({ message: "The email already exist" });
    } else {
      const newUser = await user.create({
        email,
        password,
      });
      res.status(201).json({ id: newUser.id, email: newUser.email });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
//Find the user using the email, if found the compare the password entered and the user password
//if it coincide then make the paylod for the jwt token using the id and email
//sign the token and return the token
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await user.findOne({
      where: { email },
    });
    if (!foundUser)
      return res.status(400).json({ message: "Invalid credentials" });
    bcrypt.compare(password, foundUser.password, (err, response) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      } else if (response) {
        const payload = {
          email,
          id: foundUser.id,
          username: foundUser.user,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({ token });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//First check if the password match so the user can modify it's profile
export const changeUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const foundUser = await user.findOne({
      where: { email },
    });
    if (!foundUser) return res.status(400).json({ equal: false });
    bcrypt.compare(password, foundUser.password, (err, response) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      } else if (response) {
        return res.status(200).json({ equal: true });
      }
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//then the information send by the user will modify the previous one and also
//would hash the password just in case the user change the password
export const updateUser = async (req, res) => {
  const { email, password, User } = req.body;
  try {
    const updatedUser = await user.findOne({
      where: { email },
    });
    const salt = await bcrypt.genSalt(10);
    const Hashedpassword = await bcrypt.hash(password, salt);
    updatedUser.set({
      email,
      password: Hashedpassword,
      username: User,
    });
    await updatedUser.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
