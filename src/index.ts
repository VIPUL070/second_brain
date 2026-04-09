import express, { type Request } from "express"
import cors from 'cors'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import { Content, User } from "./db.js";
import { JWT_SECRET } from "./config.js";
import { authMiddleware } from "./middleware.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

app.post('/api/v1/signup', async(req,res) => {
    const body = req.body;
    const response = signupSchema.safeParse(body);

    if(!response.success){
        return res.status(411).json({
            message: "Error in inputs"
        })
    }

    const userExist = await User.findOne({
        username: body.username
    })

    if(userExist){
        return res.status(403).json({
            message: "User already exist with this username"
        })
    }

    const user = await User.create(body);
    const userId = user._id

    const token = jwt.sign({userId} , JWT_SECRET)
    res.status(200).json({
        message: "User signup/created successfully",
        token: token
    })

});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

app.post('/api/v1/signin', async (req,res) => {
    const body = req.body;
    const response = signinSchema.safeParse(body);

    if(!response.success){
        return res.status(411).json({
            message: "Error in inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password,
    })

    if(!user){
        return res.status(403).json({
            message: "User doesn't exist with this username"
        })
    }

    const token = jwt.sign({userId: user._id }, JWT_SECRET);
    res.status(200).json({
        message: "User logged in successfully",
        token: token
    })

})

const contentSchema = zod.object({
  link: zod.string(),
  title: zod.string(),
});

app.post('/api/v1/content', authMiddleware ,async (req,res) => {
    const parsed = contentSchema.safeParse(req.body);
    const {link,title}= req.body;

    if(!parsed.success){
        return res.status(411).json({
            message: "Invalid content type"
        })
    }

    if (!req.userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

    const newContent = await Content.create({
        link,
        title,
        userId: req.userId,
    })

    res.status(200).json({
        message: "New content added successfully",
    })

})

app.get('/api/v1/content', authMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const content = await Content.find({
      userId: new mongoose.Types.ObjectId(req.userId)
    }).populate("userId", "username")

    //without extra sb call u wan to access the author of the added content we use populate("reference", "values_u_want_to_select")

    res.status(200).json({
      message: "Content successfully accessed",
      content
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching content"
    });
  }
});

const PORT = 3000;
app.listen(PORT , ()=> {
    console.log(`App listening on port: ${PORT}`)
})