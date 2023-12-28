const Users = require("../models/Users");

const getAllUsers = async (req, res) => {
    const users = await Users.find().lean()
    if (!users?.length) {
        return res.status(400).json({ message: 'Not such User' })
    }
    res.json(users)
}

const getUserById = async (req, res) => {
    const {id} = req.params
    const user = await Users.findById(id).lean()
    if (!user) {
    return res.status(400).json({ message: 'No user found' })
    }
    res.json(user)
}

const createNewUser = async (req, res) => {
    const {name, userName, email, address, phone } = req.body
    if (!name || !userName) 
    {
        return res.status(400).json({ message: 'name is required' })
    }
    const user = await Users.create({ name, userName, email, address, phone })
    if (user) 
    {
        return res.status(201).json({ message: 'New user created' })
    }
    else 
    {
        return res.status(400).json({ message: 'Invalid user ' })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await Users.findById(id)
    if (!user) 
    {
        return res.status(400).json({ message: 'User not found' })
    }
    const result = await user.deleteOne()
    const reply=`User '${result.name}' ID ${result._id} deleted`
    res.json(reply)
    }


const updateUser = async (req, res) => {
    const { id }=req.params
    const {name,userName,email,address,phone}= req.body
    if (!id) 
    {
        return res.status(400).json({ message: 'fields are required' })
    }
    const user = await Users.findById(id)
    
    if (!user)
    {
        return res.status(400).json({ message: 'User not found' })
    }

    user.name = name
    user.userName = userName
    user.email = email
    user.address = address
    user.phone = phone

    const updatedUser = await user.save()
    res.json(`'${updatedUser.name}' updated`)
    }

module.exports = {
    getAllUsers,
    createNewUser,
    getUserById,
    updateUser,
    deleteUser
}