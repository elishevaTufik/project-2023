const express = require("express")
const router = express.Router()
const postsController=require("../controller/postsController")

router.get("/getAll",postsController.getAllPosts)
router.get("/:id", postsController.getPostById)
router.post("/create", postsController.createNewPost)
router.delete("/:id",postsController.deletePost)
router.put("/updatePost/:id",postsController.updatePostTitle)

module.exports = router

