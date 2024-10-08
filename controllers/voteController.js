const { Post, User, Comment, Upvote, Downvote } = require("../database/models")

// Helpers
const isAuthenticated = require("./helpers/isAuthenticated")


const createVote = async (req, res) => {
    try {
        if (isAuthenticated(req)) {
            const userID = req.user.id;
            const postID = req.params.postId;
            const { vote } = req.body;

            if (vote === "up") {
                await Upvote.create({
                    userId: userID,
                    postId: postID
                })
            }

            if (vote === "down") {
                await Downvote.create({
                    userId: userID,
                    postId: postID
                })
            }

            return res.redirect("/");
        } else {
            return res.redirect("/");
        }

    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error in registering user");
    }

}

const deleteVote = async (req, res) => {
    try {
        if (isAuthenticated(req)) {
            const userID = req.user.id;
            const postID = req.params.postId;
            const { vote } = req.body;
            let result = ""
            if (vote === "up") {
                result = await Upvote.findAll({
                    where: {
                        userId: userID,
                        postId: postID
                    }
                })
            }
            if (vote === "down") {
                result = await Downvote.findAll({
                    where: {
                        userId: userID,
                        postId: postID
                    }
                })
            }
            for (let voted of result) {
                voted.destroy()
            }
            return res.redirect("/");
        } else {
            return res.redirect("/");
        }

    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Error in registering user");
    }

}


module.exports = { createVote, deleteVote }