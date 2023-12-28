const express = require("express")
const router = express.Router()
const usersController=require("../controller/usersController")

router.get("/getAll",usersController.getAllUsers)
router.get("/:id", usersController.getUserById)
router.post("/create", usersController.createNewUser)
router.delete("/:id",usersController.deleteUser)
router.put("/updateuser/:id",usersController.updateUser)

module.exports = router