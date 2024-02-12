import User from "../model/user.model.js";

const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(users);
  } catch (error) {

  }
};

export default getUsers;
