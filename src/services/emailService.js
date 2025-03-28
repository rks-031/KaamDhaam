import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

export const sendReminderEmail = async (todoId, userEmail) => {
  try {
    const sendEmail = httpsCallable(functions, 'sendReminderEmail');
    await sendEmail({ todoId, userEmail });
  } catch (error) {
    throw new Error('Error sending reminder email: ' + error.message);
  }
};