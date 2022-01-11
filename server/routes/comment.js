const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Film = require('../model/Film')
const Comment = require('../model/Comment')
const User = require('../model/User')

router.get("/:filmId", async(req,res)=>{
    try{
        const comments = await Comment.find({film:req.params.filmId});
        res.json({success:true, comments})
    }catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
    
})



router.post('/:filmId', verifyToken, async (req, res) => {
	const { commentBody,commentParentId} = req.body
    const film = await Film.findOne({_id:req.params.filmId})
	const user = await User.findOne({_id:req.userId})
	const username = user.username
	const avatar = user.avatar
	if (!commentBody)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		const newComment = new Comment({
			avatar,
			username,
			user:req.userId,
            commentBody,
            film,
			commentParentId
			
		})

		await newComment.save()

		res.json({ success: true, message: 'success!', comment: newComment })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/:commentId', verifyToken, async (req, res) => {
	const { commentBody} = req.body
    //const film = await Film.findOne({_id:req.params.filmId})

	if (!commentBody)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		let updatedComment = {
            commentBody,
            
		}
        updatedComment = await Comment.findOneAndUpdate({ _id: req.params.commentId},updatedComment,{new:true})
        if(!updatedComment){
            return res.status(401).json({success:false,message:'Comment not found or user not authorised'})
        }

		res.json({ success: true, message: 'success!', comment: updatedComment })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.delete('/:commentId',verifyToken,async(req,res)=>{
    try{
        const deleteComment = await Comment.findOneAndDelete({_id: req.params.commentId})
        if(!deleteComment){
            return res.status(401).json({success:false,message:'Post not found or user not authorised'})
        }
        res.json({success:true,comment:deleteComment})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

module.exports =router