import CommentForm from "./CommentForm";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from 'react'
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
const Comment = ({
  commentsLoading,
  filmId,
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = "",

}) => {
  const {authState: {isAuthenticated,user}} = useContext(AuthContext)
  const isEditing =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment._id &&
    activeComment.type === "replying";

 
  const replyId = parentId ? parentId : comment._id; 
  const date = new Date(comment.createdAt)
  

  
  return (
    <div key={comment._id} className="card bg-comment mb-2">
      {commentsLoading &&
        
        <div className='d-flex justify-content-center mt-2'>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
      }
       <div className="card-body">
          <div className="row">
              <div className="col-md-1 col-2">
              <div className="comment-image-container">
                <Avatar size={100} src={comment.avatar} icon={<UserOutlined />}/>
                
              </div>
              </div>
              <div className="ms-5 col-md-10 col-8">
                <div className="comment-content">
                  <div className="comment-author">{comment.username}</div>
                  <div>{date.toLocaleDateString()}{' '}{date.toLocaleTimeString()}</div>
              </div>
                {!isEditing && <div className="comment-text">{comment.commentBody}</div>}
                {isEditing && (
                  <CommentForm
                    submitLabel="Cập nhật"
                    hasCancelButton
                    initialText={comment.commentBody}
                    handleSubmit={(text) => {updateComment(text,comment._id);setActiveComment(null)}}
                    handleCancel={() => {
                      setActiveComment(null);
                    }}
                  />
                )}
                <div className="comment-actions">
                   { isAuthenticated && Boolean(user._id) && (
                    <div
                      className="comment-action"
                      onClick={() =>
                        setActiveComment({ id: comment._id, type: "replying" })
                      }
                    >
                      Phản hồi
                    </div>
                  )}
                  {isAuthenticated && user._id === comment.user &&  (
                    <div
                      className="comment-action"
                      onClick={() =>
                        setActiveComment({ id: comment._id, type: "editing" })
                      }
                    >
                      Sửa
                    </div>
                  )}
                  {isAuthenticated && user._id === comment.user && replies.length === 0  &&(
                    <div
                      className="comment-action"
                      onClick={() => deleteComment(comment._id)}
                    >
                      Xóa
                    </div>
                  )}
                </div>
                {isReplying && (
                  <CommentForm
                    hasCancelButton
                    submitLabel="Phản hồi"
                    handleSubmit={(text) => {addComment(text,replyId,filmId);setActiveComment(null)}}
                    handleCancel={() => {setActiveComment(null);}
                    }
                  />
                )}
                {replies.length > 0 && (
                  <div className="replies">
                    {replies.map((reply) => (
                      <Comment
                        filmId={filmId}
                        comment={reply}
                        key={reply.id}
                        setActiveComment={setActiveComment}
                        activeComment={activeComment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                        addComment={addComment}
                        parentId={comment._id}
                        replies={[]}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
        </div>
    </div>
  );
};

export default Comment;
