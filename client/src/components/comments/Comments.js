import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CommentContext } from "../contexts/CommentContext";
import CommentForm from "./CommentForm";
import Comment from "./Comment";


const Comments = ({ filmId, isAuthenticated, currentUser}) => {
  const {commentState:{comments},getComments,addComment,deleteComment,updateComment} = useContext(CommentContext)
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = comments.filter(
    (comment) => !comment.commentParentId && comment.film === filmId
  ).sort(
    (b, a) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  // console.log(rootComments);
  const getReplies = (commentId) =>
    comments
      .filter((comment) => comment.commentParentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  useEffect(() => getComments(filmId), [comments,filmId,getComments]);
  

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
      
      {rootComments.map((rootComment) => (
          <Comment
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
    </div>
  );
};

export default Comments;