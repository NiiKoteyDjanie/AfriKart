import User from '../model/userModel.js';

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "No user ID found in token" });
    }

    // Assuming you have a User model
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log("getCurrentUser error:", error);
    res.status(500).json({ message: error.message });
  }
};