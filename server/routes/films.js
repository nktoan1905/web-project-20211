const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Film = require('../model/Film')
const Episode = require('../model/Episode')

router.get("/", async(req,res)=>{
    try{
        const films = await Film.find();
        res.json({success: true, films})
    }catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
    
})


router.get('/byId/:id', async (req, res) => {
	try {
        const film = await Film.findOne({_id:req.params.id});
        const episodes = await Episode.find({film:film})
		res.json({ success: true, episodes,film})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.post('/', async (req, res) => {
	const { title, description, category,image, point,reviewerNum,status} = req.body

	if (!title || !description || !category || !image ||!status)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		const newFilm = new Film({
			title, description, category,image, point,reviewerNum,status
		})

		await newFilm.save()

		res.json({ success: true, message: 'success!', film: newFilm })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.post('/byId/:id', async (req, res) => {
	const { title, epNum, url} = req.body
    const film = await Film.findOne({_id:req.params.id});
	if (!title || !url)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		const newEpisode = new Episode({
			title, epNum, url,film
		})

		await newEpisode.save()

		res.json({ success: true, message: 'Happy learning!', episode: newEpisode })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.put('/:id', async (req, res) => {
	const { title, description, category,image, point,reviewerNum,status} = req.body

	if (!title || !description || !category || !image ||!status)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		let updatedFilm = {
			title, description, category,image, point,reviewerNum,status
		}

		updatedFilm = await Film.findOneAndUpdate({_id:req.params.id},updatedFilm,{new:true})

		if(!updatedFilm){
            return res.status(401).json({success:false,message:'Film not found or user not authorised'})
        }

		res.json({ success: true, message: 'success!', film: updatedFilm })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.delete('/:id',async(req,res)=>{
    try{
        const deleteFilm = await Film.findOneAndDelete( {_id: req.params.id})
        if(!deleteFilm){
            return res.status(401).json({success:false,message:'Post not found or user not authorised'})
        }
        res.json({success:true,film:deleteFilm})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})


module.exports = router