
import api from "../api";
import Note from "../components/Note";
import { useState, useEffect } from "react";
function Home() {
  const [notes, setNotes] = useState("");
  const [content, setContent] = useState("");
  const [title, settitle] = useState("");
  useEffect(()=>{
    getNotes();
  })
  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {setNotes(data);})
      .catch((err) => {alert(err);
        setNotes([]);});
  };
  const deleteNote=(id)=>{
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("not deleted");
        else alert("failed");
      })
      .catch((err) => alert(err));
    getNotes();
  }
  const createNote=(e)=>{
e.preventDefault();
api
  .post("/api/notes/", { content, title })
  .then((res) => {
    if (res.status === 201) alert("note created");
    else alert("failed");
  })
  .catch((err) => alert(err));
getNotes();

  }
  return<div>
    <div>
        <h2>notes</h2>
        
    </div>
    <h2>create a note</h2>
    <form onSubmit={createNote}>
        <label htmlFor="title">title:</label>
        <br/>
        <input
            type="text"
            id="title"
            name='titile'
            required
            onChange={(e)=> settitle(e.target.value)}
            value={title}/>
        <label htmlFor="content">content:</label>
        <br/>
        <textarea
            id="content"
            name='content'
            required
            onChange={(e)=> setContent(e.target.value)}
            value={content}/>
        <br/>
        <input type="submit" value="submit"></input>
    </form>
  </div>;
}
export default Home;
