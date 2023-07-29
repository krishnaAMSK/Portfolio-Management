const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        console.log('heyy')
        console.log(req.body)
        console.log('nhmm')
        const post = await new Post(req.body);
        post.save();

        res.status(200).json('Post saved successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

exports.updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }
        
        await Post.findByIdAndUpdate( request.params.id, { $set: request.body })

        response.status(200).json({success: true, message:'post updated successfully'});
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        
        await post.delete()
        console.log('Post Deleted')
        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}

exports.getPost = async (req, res) => {
    try {
        const posts = await Post.find({ email: req.params.email });
        res.status(200).json({ success: true, post: posts });
    } catch (error) {
        response.status(500).json(error)
    }
}

exports.getAllPosts = async (req, res) => {
    console.log('working')
    let email = req.query.email;
    let category = req.query.category;
    let posts;
    try {

        if(email!=undefined) 
            posts = await Post.find({ email: email });
        else if (category!=undefined) 
            posts = await Post.find({ categories: category });
        else {
            // console.log('in')
            posts = await Post.find({});
            // console.log(posts)
            // console.log('out')
        }

        res.status(200).json({ success: true, post: posts });
    } catch (error) {
        res.status(500).json(error)
    }
}