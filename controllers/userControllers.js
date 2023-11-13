const User = require("../models/userModel.js")

exports.getUser=(req,res)=>{
    res.send("<h1>Crud Assignment</h1>")
}
// to register user 
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("All input fields are required");
    }

    // Check if user is already registered
    const userExist = await User.findOne({ email });

    if (userExist) {
      throw new Error("User already exists");
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({
        success: false,
        message: "Email address is already registered",
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// to login user 
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if email and password are provided
        if (!email || !password) {
            throw new Error("Email and password are required fields");
        }

        // Find user by email
        const userData = await User.findOne({ email });

        // Check if user exists
        if (userData) {
            // Check if the provided password matches the stored password
            const isPasswordValid = userData.password === password;

            if (isPasswordValid) {
                // Successful login
                res.status(200).json({ success: true, message: "User logged in successfully", userData});
            } else {
                // Incorrect password
                res.status(401).json({ success: false, message: "Incorrect password" });
            }
        } else {
            // User not found
            res.status(404).json({ success: false, message: "No account found associated with this email" });
        }

    } catch (error) {
        // Internal server error
        res.status(500).json({ success: false, message: error.message });
    }
};
