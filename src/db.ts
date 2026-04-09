import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const URL = process.env.MONGO_URL;

mongoose.connect(`${URL}/brainly`);

const userSchema = new mongoose.Schema({
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

const contentTypes = ['image', 'video', 'article', 'audio'];

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        reuired: true
    },
    type: {
        type: String,
        enum: contentTypes,
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
        require: true
    }

});

const tagSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
export const Tag = mongoose.model("Tag", tagSchema);
export const Link = mongoose.model("Link", linkSchema);
