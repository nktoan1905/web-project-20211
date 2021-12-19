import React,{useState} from 'react'
import ModalVideo from 'react-modal-video'
import "react-modal-video/css/modal-video.css";

const VideoModal = (props) => {
  const {ep} = props
  const [isOpen, setOpen] = useState(false)

  return (
    <React.Fragment>
      <ModalVideo channel='youtube' width="200%" autoplay isOpen={isOpen} videoId={ep.videoId} onClose={() => setOpen(false)} />
      <button type="button" onClick={()=> setOpen(true)} className="btn-ep">{ep.ep}</button>
    </React.Fragment>
  )
}

export default VideoModal