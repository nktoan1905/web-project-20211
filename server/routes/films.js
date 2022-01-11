const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Film = require('../model/Film')
const Episode = require('../model/Episode')
const UserSub = require('../model/UserSub')
const Category = require('../model/Category')
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
		const categories = await Category.find({film:film})
		res.json({ success: true, episodes,film,categories})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.post('/getFilms',async(req,res) =>{
	const {filters} = req.body
	let findArgs = {}
	
	for (let key in filters) {

        if (filters[key].length > 0) {
            findArgs[key] = filters[key];
        }
    }
	
	try {
		const films = await Category.find({name:findArgs.category})
		const list = films.map(film =>{
			return film.film.toString()
		})
		
		var condition = null
	
		if(Object.keys(findArgs).length !== 0){
			if(findArgs.category && !findArgs.year)
				condition = {_id:list}
			else if (!findArgs.category && findArgs.year)
				condition = {year: findArgs.year}
			else
				condition = {_id:list,year:findArgs.year}

			
		}
		const listOfFilm = await Film.find(condition)
		res.json({success:true,listOfFilm})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })	
	}
})


router.post('/', async (req, res) => {
	const { title, description, image, year,numOfep} = req.body

	if (!title || !description || !image ||!year ||!numOfep)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		const newFilm = new Film({
			title, description, image, point:0,reviewerNum:0,year,numOfep
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

		res.json({ success: true, message: 'Succces!', episode: newEpisode })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.put('/episode/:id',async(req,res)=>{
	const { title, epNum, url} = req.body
    const episode = await Episode.findOne({_id:req.params.id});
	if (!title || !url)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		let updatedEpisode ={
			title, epNum, url,film:episode.film
		}

		updatedEpisode = await Episode.findOneAndUpdate({_id:req.params.id},updatedEpisode,{new:true})

		if(!updatedEpisode){
            return res.status(401).json({success:false,message:'Episode not found or user not authorised'})
        }

		res.json({ success: true, message: 'success!', episode: updatedEpisode })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.delete('/episode/:id',async(req,res)=>{
	try{
        const deleteEpisode = await Episode.findOneAndDelete({_id: req.params.id})
        if(!deleteEpisode){
            return res.status(401).json({success:false,message:'Not found or user not authorised'})
        }
        res.json({success:true,episode:deleteEpisode})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})


router.post('/category/:id', async (req, res) => {
	const film = await Film.findOne({_id:req.params.id});
	const { name} = req.body
	if (!name)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		const newCategory = new Category({
			name,film
		})

		await newCategory.save()

		res.json({ success: true, message: 'success', category: newCategory })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.delete('/category/:id', async(req,res)=>{
	try{
        const deleteCategory = await Category.findOneAndDelete({_id: req.params.id})
        if(!deleteCategory){
            return res.status(401).json({success:false,message:'Not found or user not authorised'})
        }
        res.json({success:true,category:deleteCategory})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})


router.put('/:id', async (req, res) => {
	const { title, description,image, point,reviewerNum,year,numOfep} = req.body

	if (!title || !description || !image ||!year ||!numOfep)
		return res
			.status(400)
			.json({ success: false, message: 'Required' })

	try {
		let updatedFilm = {
			title, description,image, point,reviewerNum,year,numOfep
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
		const deleteEpisode = await Episode.deleteMany({film:req.params.id})
		const deleteCategory = await Category.deleteMany({film:req.params.id})
        if(!deleteFilm){
            return res.status(401).json({success:false,message:'Not found or user not authorised'})
        }
        res.json({success:true,film:deleteFilm})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})


router.post('/:userId',verifyToken,async(req,res) =>{
    const { userId,filmId,title,image,point,numOfep} = req.body

	try {
		const newUserSub = new UserSub({
            userId,
            filmId,title,image,point,numOfep
		})

		await newUserSub.save()

		res.json({ success: true, message: 'success!', UserSub: newUserSub })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

router.get('/subcribe/:userId',async(req,res)=>{
    try {
        const list = await UserSub.find({userId:req.params.userId})
		const userSub = Array.from(new Set(list.map(a => a.filmId)))
		.map(filmId => {
		  return list.find(a => a.filmId === filmId)
		})
        res.json({success:true, userSub})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

router.delete('/subcribe/:userId/:filmId',verifyToken,async(req,res)=>{
	try{
        const deleteUsersub = await UserSub.findOneAndDelete( {userId: req.params.userId,filmId:req.params.filmId})
        if(!deleteUsersub){
            return res.status(401).json({success:false,message:'Not found or user not authorised'})
        }
        res.json({success:true,film:deleteUsersub})
    } catch(error){
        console.log(error)
        res.status(500).json({success:false, message:'Internal server error'})
    }
})

module.exports = router