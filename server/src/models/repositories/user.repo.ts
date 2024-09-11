import userModel from "../user.model";

const findByUsername = async (username: string) => {
  return await userModel.findOne({ username }).lean();
};

export { findByUsername };
