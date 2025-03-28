import { useState } from 'react';
import { db } from '../../config/firebase';
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import moment from 'moment';
import EditTodo from './EditTodo';

const TodoItem = ({ todo }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    setError('');
    try {
      const todoRef = doc(db, 'todos', todo.id);
      await updateDoc(todoRef, {
        completed: !todo.completed,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      setError('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;

    setLoading(true);
    setError('');
    try {
      const todoRef = doc(db, 'todos', todo.id);
      await deleteDoc(todoRef);
    } catch (error) {
      setError('Failed to delete todo');
      setLoading(false);
    }
  };

  const isOverdue = !todo.completed && moment(todo.dueDate).isBefore(moment());

  if (isEditing) {
    return <EditTodo todo={todo} onClose={() => setIsEditing(false)} />;
  }
  return (
    <div className={`card shadow-sm ${todo.completed ? 'bg-light' : ''}`}>
      <div className="card-body">
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <h5 className="card-title">{todo.title}</h5>
        {todo.description && <p className="card-text">{todo.description}</p>}
        <p className="card-text">
          <small className="text-muted">
            Due: {moment(todo.dueDate).format('MMMM Do YYYY, h:mm a')}
          </small>
        </p>
        <div className="d-flex justify-content-between">
          <div className="btn-group">
            <button
              className={`btn ${todo.completed ? 'btn-success' : 'btn-primary'}`}
              onClick={handleComplete}
              disabled={loading}
            >
              {loading ? 'Updating...' : todo.completed ? 'Completed' : 'Mark Complete'}
            </button>
            {!todo.completed && (
              <button
                className="btn btn-outline-warning"
                onClick={() => setIsEditing(true)}
                disabled={loading}
                style={{ borderColor: '#fd7e14', color: '#fd7e14' }}
              >
                Edit
              </button>
            )}
          </div>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;