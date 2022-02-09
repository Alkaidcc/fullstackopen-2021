const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
    Blog.find({})
        .then(blogs => {
            res.json(blogs)
        })
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
                res.json(blog)
            } else {
                res.status(404).send({ error: 'blog not found' })
            }
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).json(result)
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const blog = {
        name: body.name,
        number: body.number
    }
    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

blogsRouter.post('/',(req,res,next)=>{

    const blog = new Blog(req.body)
    blog.save()
        .then(savedBlog => {
            res.status(201).json(savedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter