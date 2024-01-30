import User from "../models/user.js";
import jwt from "jsonwebtoken";


const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        tokens: user.tokens,
      },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default getUser;