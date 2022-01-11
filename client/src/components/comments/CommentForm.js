import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText="",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder="Nhập bình luận của bạn tại đây"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="d-flex align-items-end flex-column mb-3">
          <button type="Submit" className="btn btn-danger" disabled={isTextareaDisabled} >{submitLabel}</button>
      </div>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Hủy
        </button>
      )}
    </form>
  );
};

export default CommentForm;
