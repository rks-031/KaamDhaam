# KaamDhaam - A Modern Todo Application

A full-featured todo application built with React, Firebase, and Bootstrap featuring authentication, real-time updates, and a clean UI.

## Features

- 🔐 User Authentication (Email/Password & Google Sign-in)
- 📝 Create, Read, Update, Delete (CRUD) operations for todos
- 🕒 Real-time updates using Firebase
- 🎨 Clean, responsive UI with Bootstrap
- ⏰ Due date tracking and overdue notifications
- 🔍 Filter todos (All/Active/Completed)
- 👤 User avatar display
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React + Vite
- **UI Framework**: Bootstrap 5
- **Backend & Auth**: Firebase
- **Database**: Firestore
- **Routing**: React Router v6
- **Date Handling**: Moment.js

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   └── todos/          # Todo-related components
│   ├── config/             # Firebase configuration
│   ├── context/            # React context providers
│   ├── services/           # Firebase services
│   └── App.jsx            # Main application component
├── public/
└── package.json
```

## Key Components

- `TodoList`: Main component for displaying and managing todos
- `AddTodo`: Form component for creating new todos
- `TodoItem`: Individual todo item display and actions
- `TodoFilter`: Filter controls for todo list
- `Login/Register`: Authentication forms
- `ProtectedRoute`: Route guard for authenticated users

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password and Google)
3. Create Firestore database
4. Set up security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Firebase for Authentication and Database
- Bootstrap for UI components
- React community for awesome tools and libraries