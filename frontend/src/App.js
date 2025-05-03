import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [jwt, setJwt] = useState('');

  const login = async () => {
    const res = await axios.post('http://localhost:8000/auth/login');
    const token = res.data.access_token;
    setJwt(token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    fetchNotes();
  };

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:8000/notes');
    setNotes(res.data);
  };

  const createNote = async () => {
    await axios.post('http://localhost:8000/notes', { title, content });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  const analyzeNote = async (id) => {
    const res = await axios.get(`http://localhost:8000/notes/${id}/analyze`);
    alert(`Sentiment: ${res.data.sentiment}`);
  };

  useEffect(() => {
    if (jwt) fetchNotes();
  }, [jwt]);

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Notes App</h2>
      {!jwt ? (
        <button onClick={login}>Login</button>
      ) : (
        <>
          <div>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <br />
            <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
            <br />
            <button onClick={createNote}>Add Note</button>
          </div>
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <strong>{note.title}</strong>
                <p>{note.content}</p>
                <button onClick={() => analyzeNote(note.id)}>Analyze</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
