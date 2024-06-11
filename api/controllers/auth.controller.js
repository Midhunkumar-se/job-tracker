import User from "../models/user.model.js";
import BadRequestError from "../errors/bad-request.js";

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      throw new BadRequestError("Please fill out all fields");
    }

    await User.create({ ...req.body });
    res.json({ message: "user created" });
  } catch (error) {
    next(error);
  }
};
