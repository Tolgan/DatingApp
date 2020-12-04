const express = require("express");
const route = express();
const User = require("../models/UserModal");

//LOGIN WE WILL USE ID IN PRODUCTION
route.get("/:name", async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  if (user) {
    res.json({
      userId: user._id,
      name: user.name,
      gender: user.gender,
      image: user.image,
      likedUsers: user.likedUsers,
    });
  } else {
    res.status(404).json({ message: "No such user" });
  }
});

// GET USERS ,POST USED BCS WE DONT USE JWT FOR NOW
route.post("/", async (req, res) => {
  const { gender, userId } = req.body;

  const users = await User.find({
    gender: { $ne: gender },
    likedBy: { $ne: userId },
    id: { $ne: userId },
  });

  res.status(201).json({ people: users });
});

//LIKE USER
route.post("/like/:id", async (req, res) => {
  const userId = req.body.userId.toString();
  const user = await User.findOne({ _id: userId });

  if (user) {
    user.likedUsers.push(req.params.id);
    const likedUser = await User.findOne({ _id: req.params.id }).populate(
      "likedUsers",
      "_id"
    );
    likedUser && likedUser.likedBy.push(req.body.userId);
    await user.save();
    await likedUser.save();
    res.status(201).json({
      success: true,
      message: "You liked User",
      likedUser: likedUser.likedUsers,
    });
  } else {
    res.json({ message: "no such a user" });
  }
});
//DISLIKE USER
route.post("/dislike/:id"),
  async (req, res) => {
    const user = await User.find({ id: req.body.userId });
    user.dislikedUsers.push(req.params.id);

    await user.save();

    res.status(201).json({ success: true, message: "You disliked User" });
  };
//GET ALL LIKED USERS
route.get("/usersliked/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).populate(
    "likedUsers",
    "name image"
  );
  const { likedUsers } = user;

  if (user) {
    res.json({ likedUsers });
  }
});

// GET MATCHES

route.get("/matched/:id", async (req, res) => {
  const matched = await User.findOne({ _id: req.params.id }).populate({
    path: "likedUsers",
    match: { likedUsers: req.params.id },
    select: "name image",
  });

  if (matched.likedUsers) {
    res.json({ matches: matched.likedUsers });
  } else {
    res.status(404).json({ message: "You dont have match yet,Go Swiping" });
  }
});

// CANCEL MATCH JUST SO WE CAN SEE FEAUTURE OF APP AND SWIPE AGAIN
route.put("/matched/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const likedUser = await User.findOne({ _id: req.body.userId });

  if (user && likedUser) {
    function filterUser(data) {
      return data.filter(
        (item) => item._id.toString() !== req.body.userId.toString()
      );
    }
    function filterLikedUser(data) {
      return data.filter(
        (item) => item._id.toString() !== req.params.id.toString()
      );
    }
    const filteredUsers = filterUser(user.likedUsers);
    const filteredUsers2 = filterUser(user.likedBy);
    const filterLikedUsers = filterLikedUser(likedUser.likedUsers);
    const filterLikedUsers2 = filterLikedUser(likedUser.likedBy);
    user.likedUsers = filteredUsers;
    user.likedBy = filteredUsers2;
    likedUser.likedUsers = filterLikedUsers;
    likedUser.likedBy = filterLikedUsers2;
    await user.save();
    await likedUser.save();
    res.json({ message: "Match deleted", success: "true" });
  } else {
    res.status(401).json({ message: "Some Error Deleting Match" });
  }
});

module.exports = route;
