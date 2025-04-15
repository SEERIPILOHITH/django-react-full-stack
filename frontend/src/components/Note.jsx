import React from "react";

function Note({ note, ondelete }) {
  const formatedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div className="card">
    <div className="card-header">
    {note.title}
    </div>
    <div className="card-body">
      
      <p className="card-text">{note.content}</p>
      <p className="card-text">{formatedDate}</p>
    
      <buton className="btn btn-primary" onClick={() => ondelete(note.id)}>delete</buton>
  </div>
  </div>
  );
}
export default Note;