import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; 

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/authors/${id}`);
      fetchAuthors();
    } catch (error) {
      console.error('Error deleting author', error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post('/authors', { name, surname });
      setName('');
      setSurname('');
      fetchAuthors();
    } catch (error) {
      console.error('Error adding author', error);
    }
  };

  const handleEdit = (author) => {
    setEditing(true);
    setCurrentAuthor(author);
    setName(author.name);
    setSurname(author.surname);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/authors/${currentAuthor.id}`, { name, surname });
      setEditing(false);
      setCurrentAuthor(null);
      setName('');
      setSurname('');
      fetchAuthors();
    } catch (error) {
      console.error('Error updating author', error);
    }
  };

  return (
    <div>
      <h1>Authors</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
        {editing ? (
          <button onClick={handleUpdate}>Update author</button>
        ) : (
          <button onClick={handleAdd}>Add author</button>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.surname}</td>
              <td>
                <button onClick={() => handleEdit(author)}>Edit</button>
                <button onClick={() => handleDelete(author.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Authors;
