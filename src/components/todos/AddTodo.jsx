import { useState } from 'react';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddTodo = ({ userId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'todos'), {
        userId,
        title: title.trim(),
        description: description.trim(),
        dueDate: new Date(dueDate).toISOString(),
        completed: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      setError('Failed to add todo: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-3">Add New Todo</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Todo title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              minLength={3}
              maxLength={100}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
            />
          </div>
          <div className="mb-3">
            <input
              type="datetime-local"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;