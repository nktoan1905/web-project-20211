import React,{useState} from 'react'
import ReactPlayer from "react-player";
import Modal from 'react-modal';

const Player = (props) => {
    const { ep } = props;
    const [modalOpen,setModalOpen] = useState(false)

    const toggleModal = () =>{
        setModalOpen(!modalOpen)
    }

    const bg = {
        content: {
          background: "#242424"
        },
        overlay:{
            background:"rgba(0,0,0,0.5)"
        }
      };
     
    return (
        <>
            <button type="button" className="btn-ep" onClick={toggleModal}>{ep.epNum}</button>
            <Modal isOpen={modalOpen} onRequestClose={toggleModal} style={bg}>
                <div className='d-flex justify-content-end mb-2'>
                    <button type="button" className="btn btn-danger" onClick={toggleModal}><i class="bi bi-x-lg"></i></button>
                </div>
                <ReactPlayer url={ep.url} width="100%" height="90%" playing={modalOpen} controls={true}/>
            </Modal>
            
            
        </>
    )
}

export default Player
