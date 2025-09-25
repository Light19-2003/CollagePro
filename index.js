import expess from "express";
import mango from "mongoose";
import User from "./Models/UserLoginModel.js"; // yaha import kiya

import bcrypt from "bcrypt";

import createuser from "./Models/createUserModel.js";

const app = expess();
app.use(expess.json());

mango
  .connect(
    "mongodb+srv://akshit:1234567890@lightcluster.eq90pwy.mongodb.net/collageproject"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/createuser", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name, email, and password are required" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new createuser({ name, email, password: hashedPassword });
  await user.save();
  res
    .status(201)
    .json({ message: "User created successfully", userdetails: user });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await createuser.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Use the password from the fetched user
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Remove password before sending response
  // const { password: pwd, ...userWithoutPassword } = user._doc;

  res.status(200).json({ message: "Login successful", userdetails: user });
});

// app.post("/api/Login", (req, res) => {

//   const { email, password } = req.body;

//   if(!email || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   let user =  await User

// });

const port = 10000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
