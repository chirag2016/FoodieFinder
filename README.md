
# 🍲 FoodieFinder – Recipe Management App

**FoodieFinder** is a modern web-based recipe management platform built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). Designed for food enthusiasts, it allows users to add, save, and manage their favorite recipes through a clean, responsive interface.



## 🚀 Features

- 🔐 **User Authentication** – Secure sign-up and login using JWT & bcrypt.
- 📝 **Add New Recipes** – Input title, ingredients, instructions, and image.
- 🗑️ **Delete Recipes** – Remove recipes from your list with one click.
- ❤️ **Like & Save** – Favorite recipes and store them separately.
- ❌ **Unsave Recipes** – Remove recipes from favorites any time.
- 📱 **Responsive Design** – Smooth experience across devices.



## 🧰 Tech Stack

| Frontend          | Backend             | Database    | Authentication |
|------------------|---------------------|-------------|----------------|
| React.js         | Node.js + Express.js| MongoDB     | JWT, bcrypt    |

Other Tools:
- 🔁 Axios for API calls  
- 🧠 useState & useEffect for state management  
- 📦 Mongoose for schema definitions  
- 🔄 React Router for navigation



## 📂 Project Structure (High-Level)
```
/client           → React Frontend  
/server           → Node/Express Backend  
└── /routes       → API endpoints  
└── /models       → Mongoose schemas  
```


 📌 API Endpoints

**Recipe Routes:**
- `GET /api/recipes` – View all recipes  
- `POST /api/recipes` – Add a new recipe  
- `DELETE /api/recipes/:id` – Delete recipe

**User Routes:**
- `POST /api/users/signup` – User Registration  
- `POST /api/users/login` – User Login  

**Liked Recipes:**
- `POST /api/likedrecipes` – Save to favorites  
- `DELETE /api/likedrecipes/:id` – Remove from favorites  


## 🔄 Data Flow

1. User logs in and receives a JWT token.  
2. User submits recipe details via form.  
3. Data is sent to backend using Axios → stored in MongoDB.  
4. Favorites and recipe lists update in real-time via GET requests.  
5. DELETE operations remove entries from DB using ObjectId.


## 🔒 Security

- Passwords are **hashed** using bcrypt before database storage.  
- Sessions are **token-based** using JSON Web Tokens.  
- Protected routes restrict access based on authentication state.


## 📈 Future Scope

- 🌟 Star ratings & user comments  
- 🗂️ Recipe categories & filters  
- 🖼️ Image uploads (currently via image URL)  
- 📊 Recipe analytics dashboard  


## 👨‍💻 Developed By

**Chirag Dosi**  
BTech CSE, Pandit Deendayal Energy University  
[GitHub Profile](https://github.com/chirag2016)  
