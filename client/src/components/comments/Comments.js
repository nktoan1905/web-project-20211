import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CommentContext } from "../contexts/CommentContext";
import CommentForm from "./CommentForm";
import Comment from "./Comment";


const Comments = ({ filmId, isAuthenticated, currentUser}) => {
  const {commentState:{comments,commentsLoading},getComments,addComment,deleteComment,updateComment} = useContext(CommentContext)
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = comments.filter(
    (comment) => !comment.commentParentId && comment.film === filmId
  ).sort(
    (b, a) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const [noOfElement,setNoOfElement] = useState(4)
  const loadMore = () =>{
    setNoOfElement(noOfElement+noOfElement);
  }

  const slice = rootComments.slice(0,noOfElement)
  // console.log(rootComments);
  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment.commentParentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  useEffect(() => getComments(filmId), [comments]);
  

  let navigate = useNavigate();

  return (
    <div className="card mt-2 bg p-2">
      <h4><i className="bi bi-card-text"></i> Bình luận</h4>
      {isAuthenticated ?
        <CommentForm submitLabel="Gửi" handleSubmit={(text) => addComment(text,"",filmId)}/>
        :
        <div className="mt-3 mb-3 d-flex justify-content-center text-decoration-none">
            <button onClick={() => navigate('/login')} className="btn btn-danger w-200">Đăng nhập để bình luận</button>
        </div>
      }
      {commentsLoading &&
        
        <div className='d-flex justify-content-center mt-2'>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      }
      {slice.map((rootComment) => (
          <Comment
            commentsLoading={commentsLoading}
            filmId={filmId}
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUser={currentUser}
            
          />
      ))}
      {slice.length < rootComments.length ?<button className="btn btn-danger" onClick={()=>loadMore()}>Xem thêm</button>:""}
    </div>
  );
};

export default Comments;
