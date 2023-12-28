const Posts = require("../models/Posts");

const getAllPosts = async (req, res) => {
    const posts = await Posts.find().lean()
    if (!posts?.length) {
        return res.status(400).json({ message: 'Not such Post' })
    }
    res.json(posts)
}

const getPostById = async (req, res) => {
    const {id} = req.params
    const post = await Posts.findById(id).lean()
    if (!post) {
    return res.status(400).json({ message: 'No post found' })
    }
    res.json(post)
}

const createNewPost = async (req, res) => {
    const {title, body} = req.body
    if (!title || !body) 
    {
        return res.status(400).json({ message: 'title and body are required' })
    }
    const post = await Posts.create({ title, body })
    if (post) 
    {
        return res.status(201).json({ message: 'New post created' })
    }
    else 
    {
        return res.status(400).json({ message: 'Invalid post' })
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params
    const post = await Posts.findById(id)
    if (!post) 
    {
        return res.status(400).json({ message: 'Post not found' })
    }
    const result = await post.deleteOne()
    const reply=`Post '${result.title}' ID ${result._id} deleted`
    res.json(reply)
    }


const updatePostTitle = async (req, res) => {
    const { id } = req.params
    const {title, body}= req.body
    if (!id ) 
    {
        return res.status(400).json({ message: 'fields are required' })
    }
    const post = await Posts.findById(id)
    
    if (!post)
    {
        return res.status(400).json({ message: 'Post not found' })
    }

    post.title = title
    post.body = body

    const updatedPost = await post.save()
    res.json(`'${updatedPost.title}' updated`)
    }


module.exports = {
    getAllPosts,
    createNewPost,
    getPostById,
    updatePostTitle,
    deletePost
}