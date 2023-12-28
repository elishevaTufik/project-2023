const Photos = require("../models/Photos");

const getAllPhotos = async (req, res) => {
    const photos = await Photos.find().lean()
    if (!photos?.length) {
        return res.status(400).json({ message: 'Not such photo' })
    }
    res.json(photos)
}

const getPhotoById = async (req, res) => {
    const {id} = req.params
    const photo = await Photos.findById(id).lean()
    if (!photo) {
    return res.status(400).json({ message: 'No photo found' })
    }
    res.json(photo)
}

const createNewPhoto = async (req, res) => {
    const {title,imageUrl} = req.body
    if (!title) 
    {
        return res.status(400).json({ message: 'title and imageUrl are required' })
    }
    const photo = await Photos.create({ title,imageUrl })
    if (photo) 
    {
        return res.status(201).json({ message: 'New photo created' })
    }
    else 
    {
        return res.status(400).json({ message: 'Invalid photo ' })
    }
}

const deletePhoto = async (req, res) => {
    const { id } = req.params
    const photo = await Photos.findById(id)
    if (!photo) 
    {
        return res.status(400).json({ message: 'Photo not found' })
    }
    const result = await photo.deleteOne()
    const reply=`Photo '${result.name}' ID ${result._id} deleted`
    res.json(reply)
    }


const updatePhotoTitle = async (req, res) => {
    const { id } = req.params
    const {title}= req.body
    if (!id || !title ) 
    {
        return res.status(400).json({ message: 'fields are required' })
    }
    const photo = await Photos.findById(id)
    
    if (!photo)
    {
        return res.status(400).json({ message: 'Photo not found' })
    }

    photo.title = title
    const updatedPhoto = await photo.save()
    res.json(`'${updatedPhoto.title}' updated`)
    }

module.exports = {
    getAllPhotos,
    createNewPhoto,
    getPhotoById,
    updatePhotoTitle,
    deletePhoto
}