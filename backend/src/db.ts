import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const URL = process.env.MONGO_URL;

mongoose.connect(`${URL}/brainly`);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const ContentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

const TagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

const LinkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const User = mongoose.model("User", UserSchema);
export const Content = mongoose.model("Content", ContentSchema);
export const Tag = mongoose.model("Tag", TagSchema);
export const Link = mongoose.model("Link", LinkSchema);
