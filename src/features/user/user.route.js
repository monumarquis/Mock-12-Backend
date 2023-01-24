const userModel = require('./user.model')
const express = require('express')
const app = express.Router()
const bcrypt  =require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;

app.get('/',async (req,res)=>{
  const user = await  userModel.find({});
  return res.status(201).send(user)
})

// signup route
app.post('/signup',async (req,res)=>{
    const { role, email, password,fullname } = req.body
    if(!fullname || !email || !password||!role ) return res.status(403).send({message:"Please Enter All Credential"})

    const exsist = await userModel.findOne({ email })
    if(exsist) return res.status(404).send({message:"User Already Created Try Logging in"})

    console.log(req.body);
    const hash = bcrypt.hashSync(password, 10);
    const user = await  userModel({  fullname, email, password:hash,role });
                 user.save()
  
    return res.status(201).send({user,message:"You have Signup Successfully"});
})


// Log in Route
app.post('/login',async (req,res)=>{
    const { email, password } = req.body;

    console.log(email,password)

  if (!email || !password) {
    return res.status(403).send({message:"Please Enter All Credentials"});
  }
  const User = await userModel.findOne({ email })

 if (!User) return res.status(404).send("User Not Found");

  try {
    const match = bcrypt.compareSync(password, User.password);
   console.log(match)
    if (match) {
      //login
      const token = jwt.sign(
        {
          _id: User.id,
          username: User.fullname,
          email:User.email,
          password: User.password,
          role:User.role
        },
        SECRET_TOKEN,
        {
          expiresIn: "7 days",
        }
      );
      const refresh_token = jwt.sign(
        {
          _id: User.id,
          username: User.username,
          email:User.email,
          password: User.password,
        },
        SECRET_REFRESH_TOKEN,
        {
          expiresIn: "28 days",
        }
      );
      return res
        .status(200)
        .send({ message: "Login Successfully", token, role:User.role});
    } else {
      return res.status(401).send({ message: "Invalid Credentials" });
    }
  } catch {
    return res.status(401).send({ message: "Invalid Credentials" });
  }
})
module.exports = app