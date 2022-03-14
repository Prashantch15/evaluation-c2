const express = require("express");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const app = express();

const connect = () => {
    return mongoose.connect("mongodb+srv://dhaval:dhaval_123@cluster0.ljuvz.mongodb.net/web15-atlas?retryWrites=true&w=majority");
};

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: boolean, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
});
const User = mongoose.model("user", userSchema);


const branchDetail = new mongoose.Schema({
    Name: { type: String, required: true },
    address: { type: String, required: true },

    IFSC: { type: String, required: true },
    MICR: { type: Number, required: true, unique: true },

}, {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
});

const branch = mongoose.model("branch", branchDetail);

const masterAccount = new mongoose.Schema({
    Balance: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },


}, {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
});

const master = mongoose.model("master", masterAccount);

const savingAccount = new mongoose.Schema({
    account_number: { type: String, required: true },
    balance: { type: Number, required: true },

    interestRate: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

}, {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
});

const saving = mongoose.model("saving", savingAccount)
const fixedAccount = new mongoose.Schema({
    Account_number: { type: String, required: true },
    Balance: { type: String, required: true },

    interestRate: { type: String, required: true },

    startDate: { type: Number, required: true, unique: true },

    maturityDate: { type: Number, required: true, unique: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true, // createdAt, updatedAt
});

const fixed = mongoose.model("fixed", fixedAccount)

app.get("/users", async(req, res) => {
    try {
        const users = await User.find().lean().exec();

        return res.status(200).send({ users: users }); // []
    } catch (err) {
        return res
            .status(500)
            .send({ message: "Something went wrong .. try again later" });
    }
});

app.post("/users", async(req, res) => {
    try {
        const user = await User.create(req.body);

        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.get("/users/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        // db.users.findOne({_id: Object('622893471b0065f917d24a38')})

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.patch("/users/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            .lean()
            .exec();
        // db.users.update({_id: Object('622893471b0065f917d24a38')}, {$set: {req.body}})

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.delete("/users/:id", async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        // db.users.deleteOne({_id: Object('622893471b0065f917d24a38')})

        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

// POSTS CRUD
app.get("/posts", async(req, res) => {
    try {
        const posts = await Post.find().lean().exec();

        return res.status(200).send(posts);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.post("/posts", async(req, res) => {
    try {
        const post = await Post.create(req.body);

        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.get("/posts/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id).lean().exec();

        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.patch("/posts/:id", async(req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            })
            .lean()
            .exec();

        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

app.delete("/posts/:id", async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(post);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});


app.listen(6789, async() => {
    try {
        await connect();
    } catch (err) {
        console.log(err);
    }

    console.log("listening on port 6789");
});