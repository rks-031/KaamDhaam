import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';

// Create a new todo
export const createTodo = async (userId, todoData) => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), {
      ...todoData,
      userId,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (todoId, todoData) => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await updateDoc(todoRef, {
      ...todoData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (todoId) => {
  try {
    const todoRef = doc(db, 'todos', todoId);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

// Create or update user profile
export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};