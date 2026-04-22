import express, { type Request } from "express"
import cors from 'cors'
import zod from 'zod'
import jwt from 'jsonwebtoken'
import { Content, Link, User } from "./db.js";
import { authMiddleware } from "./middleware.js";
import mongoose from "mongoose";
import { generateRandom } from "./utils.js";
import { JWT_SECRET } from "./config.js";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

const signupSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
});

app.post('/api/v1/signup', async (req, res) => {
  const body = req.body;
  const response = signupSchema.safeParse(body);

  if (!response.success) {
    return res.status(411).json({
      message: "Error in inputs"
    })
  }

  const userExist = await User.findOne({
    username: body.username
  })

  if (userExist) {
    return res.status(403).json({
      message: "User already exist with this username"
    })
  }

  const user = await User.create(body);
  const userId = user._id

  const token = jwt.sign({ userId }, JWT_SECRET)
  res.status(200).json({
    message: "User signup/created successfully",
    token: token
  })

});

const signinSchema = zod.object({
  username: zod.string().min(1),
  password: zod.string().min(1),
});

app.post('/api/v1/signin', async (req, res) => {
  const body = req.body;
  const response = signinSchema.safeParse(body);

  if (!response.success) {
    return res.status(411).json({
      message: "Error in inputs"
    })
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  })

  if (!user) {
    return res.status(403).json({
      message: "User doesn't exist with this username"
    })
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);
  res.status(200).json({
    message: "User logged in successfully",
    token: token
  })

})

const contentSchema = zod.object({
  link: zod.string().min(1),
  title: zod.string().min(1),
  type: zod.string()
});

app.post('/api/v1/content', authMiddleware, async (req, res) => {
  const parsed = contentSchema.safeParse(req.body);
  const { link, title,type } = req.body;

  if (!parsed.success) {
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
    type,
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

app.delete('/api/v1/delete', authMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!contentId) {
      return res.status(400).json({ message: "contentId required" });
    }

    const result = await Content.deleteOne({
      _id: contentId,
      userId: req.userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Content not found or not owned by you" });
    }

    res.status(200).json({
      message: "Content deleted",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting content"
    });
  }
});

app.post("/api/v1/brain/share", authMiddleware, async (req, res) => {
  try {
    const { share } = req.body;

    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (share) {
      let existingLink = await Link.findOne({ userId: req.userId });

      if (existingLink) {
        return res.status(200).json({
          message: "Returned existing hash link",
          hash: existingLink.hash,
        });
      }

      const hash = generateRandom(10);

      await Link.create({
        userId: req.userId,
        hash,
      });

      return res.status(200).json({
        message: "Created new hash link",
        hash: hash,
      });
    }

    await Link.deleteOne({
      userId: req.userId,
    });

    return res.status(200).json({
      message: "Removed share link",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink

  if (!hash) {
    return res.status(400).json({
      messgae: "Share link required"
    })
  }

  const link = await Link.findOne({
    hash: hash
  })

  if (!link?.userId) {
    return res.status(411).json({
      message: "Sorry incorrect share link"
    })
  }

  const [content, user] = await Promise.all([
    Content.find({ userId: link.userId }),
    User.findOne({_id : link.userId})
  ]);

  res.status(200).json({
    message: "Link shared successfully",
    content,
    username: user?.username
  })
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }

})


app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`)
})