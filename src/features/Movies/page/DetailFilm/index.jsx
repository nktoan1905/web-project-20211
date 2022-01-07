import PropTypes from "prop-types";
import { useParams,useNavigate } from 'react-router-dom';
import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import FilmInfo from "../../components/FilmInfo/FilmInfo";
import FilmEpisodes from "../../components/FilmEpisodes";
import { Button,CircularProgress,Box,Card,CardActions,CardContent,Typography,InputLabel,MenuItem,FormControl,Select,Alert,IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { apiUrl } from "../../../Constants/constants";
import {data} from './Datas'
const DetailFilmPage = (props) => {
  let {filmsId} = useParams()
  let navigate = useNavigate()
  const [film,setFilm] = useState(null)
  const [category, setCategory] = useState('');
  const [categories,setCategories] = useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  
  const getFilm = async (filmId) => {
		try {
			const response = await axios.get(`${apiUrl}/films/byId/${filmId}`)
			if (response.data.success) {
				setFilm(response.data)
        setCategories(response.data.categories)
			}
		} catch (error) {
			console.log(error)
		}
	}

  const addCategory = async (name) =>{
    try {
      const response = await axios.post(`${apiUrl}/films/category/${filmsId}`,{name})
			if (response.data.success) {
				setCategories([...categories,response.data.category])
			}
    } catch (error) {
      console.log(error)
    }
  }

  const deleteCategory = async (id) =>{
    try {
      const response = await axios.delete(`${apiUrl}/films/category/${id}`)
			if (response.data.success) {
				setCategories(categories.filter(cate => cate._id !== id))
			}
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () =>{
    if(category !== ''){
      addCategory(category)
    }
      
  }

  const handleDelete = (id) =>{
    deleteCategory(id)
  }

  const deleteFilm = async(id) =>{
    try {
      const response = await axios.delete(`${apiUrl}/films/${id}`)
			if (response.data.success) {
        
			}
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getFilm(filmsId)
    
  }, [])
  
  return (
    <div className="container-film-detail">
      {film ? <FilmInfo film = {film.film}/>:<Box sx={{ display: 'flex' ,justifyContent:'center'}}><CircularProgress /></Box>}
      {film ? <FilmEpisodes episodes={film.episodes} filmId={film.film._id}/>: ""}
      {film ? <div className="makeStyles-root-1 MuiBox-root css-0">
        <Box sx={{ minWidth: 300 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 1.5,textAlign:'center',color:'#6495ed' }}>
                Thêm thể loại
              </Typography>
              <Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Thể loại"
                    onChange={handleChange}
                    sx={{ mb: 1.5}}
                  >
                    {data.map(cate =>{
                      return<MenuItem key={cate._id} value={cate.name}>{cate.name}</MenuItem> 
                    })}
                  </Select>
                  <Button onClick={handleSubmit} size="small" variant="contained" type="submit">Thêm</Button>
                </FormControl>
              </Typography>
            </CardContent>
            <CardActions>
              
            </CardActions>
          </Card>
        </Box>
        <Box sx={{ minWidth: 300 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 1.5,textAlign:'center',color:'#6495ed' }}>
                Danh sách thể loại
              </Typography>
              <Typography>
                  {categories.map(cate => {
                    return(
                      <Alert
                        action={
                          <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => handleDelete(cate._id)}
                          >
                            <CloseIcon fontSize="inherit" />
                          </IconButton>
                        }
                        sx={{ m: 2,width:200,display:'inline-flex' }}
                      >
                        {cate.name}
                      </Alert>
                    )
                  })}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>:""}
      
      <Button variant="outlined" onClick={()=>{deleteFilm(filmsId);navigate('/films')}} color="secondary" className="btn-del">Delete</Button>
      
      
    </div>
  );
};

DetailFilmPage.propTypes = {};

export default DetailFilmPage;
