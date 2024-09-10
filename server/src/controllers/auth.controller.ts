import userModel from "../models/user.model";
class AuthController {
  register = async (req, res) => {
    try {
      const { username, password, fullname, bod, address } = req.body;
      const user = await userModel.create({
        username,
        password,
        fullname,
        bod,
        address,
      });
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to create user" });
    }
  };
}

export default new AuthController();
