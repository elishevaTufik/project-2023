const express = require("express")
const router = express.Router()
const photosController=require("../controller/photosController")

router.get("/getAll",photosController.getAllPhotos)
router.get("/:id", photosController.getPhotoById)
router.post("/create", photosController.createNewPhoto)
router.delete("/:id",photosController.deletePhoto)
router.put("/updateTitle/:id",photosController.updatePhotoTitle)

module.exports = router