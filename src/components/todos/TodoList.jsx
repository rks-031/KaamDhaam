import { useState, useEffect, useContext } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import TodoFilter from './TodoFilter';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    try {
      const q = query(
        collection(db, 'todos'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const todosData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setTodos(todosData);
          setLoading(false);
        },
        (error) => {
          if (error.message.includes('index')) {
            setError('Setting up database... Please wait a minute and refresh.');
          } else {
            setError(error.message);
          }
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [user]);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">काम की सूची</h2>
      <AddTodo userId={user.uid} />
      <TodoFilter filter={filter} setFilter={setFilter} />
      {filteredTodos.length === 0 ? (
        <div className="alert alert-info text-center">
          No {filter !== 'all' ? filter : ''} todos found
        </div>
      ) : (
        <div className="row">
          {filteredTodos.map(todo => (
            <div key={todo.id} className="col-md-6 mb-3">
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;