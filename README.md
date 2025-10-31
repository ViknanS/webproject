# 💰 BudgetBuddy - Personal Expense Tracker

**Course:** 23CS2048 - Web Technology  
**Project Type:** III Internal Assessment (IA)

A full-stack web application for tracking personal expenses with real-time analytics and budget management.

---

## 🌟 Features

- ✅ **User Authentication** - Secure registration and login with JWT
- ✅ **Expense Management** - Complete CRUD operations
- ✅ **Visual Analytics** - Pie charts and bar charts using Chart.js
- ✅ **Budget Tracking** - Set and monitor monthly budgets
- ✅ **Category-wise Analysis** - 8 expense categories
- ✅ **Responsive Design** - Works on all devices
- ✅ **Real-time Updates** - Instant dashboard updates

---

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5
- Chart.js
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication
- bcrypt.js for password hashing

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Git
- VS Code (recommended)

---

## 🚀 Installation & Setup

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd budgetbuddy
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: MongoDB Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### Step 4: Configure Environment
Create `.env` file in root directory:
```env
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
JWT_SECRET=your_secret_key_here
SESSION_EXPIRE=7d
NODE_ENV=development
```

### Step 5: Start Application
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

### Step 6: Access Application
Open browser and navigate to:
```
http://localhost:5000
```

---

## 📁 Project Structure

```
budgetbuddy/
├── models/
│   ├── User.js          # User schema
│   └── Expense.js       # Expense schema
├── routes/
│   ├── auth.js          # Authentication routes
│   └── expenses.js      # Expense CRUD routes
├── views/
│   ├── index.html       # Landing page
│   ├── register.html    # Registration page
│   ├── login.html       # Login page
│   ├── dashboard.html   # Main dashboard
│   └── addExpense.html  # Add expense form
├── public/
│   └── css/
│       └── style.css    # Custom styles
├── server.js            # Main server file
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md           # Documentation
```

---

## 🔐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |

### Expenses
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses |
| GET | `/api/expenses/:id` | Get single expense |
| POST | `/api/expenses` | Create expense |
| PUT | `/api/expenses/:id` | Update expense |
| DELETE | `/api/expenses/:id` | Delete expense |
| GET | `/api/expenses/stats/summary` | Get statistics |

---

## 👤 Usage Guide

### 1. Register Account
- Navigate to Register page
- Fill in name, email, password
- Set monthly budget (optional, default: ₹50,000)
- Click "Register"

### 2. Add Expenses
- Go to "Add Expense" page
- Enter title, amount, category, date
- Add description (optional)
- Click "Add Expense"

### 3. View Dashboard
- See total spent and remaining budget
- View pie chart and bar chart
- Filter expenses by category
- Edit or delete expenses

### 4. Manage Expenses
- Click "Edit" button to modify expense
- Click "Delete" button to remove expense
- Use category filter to organize view

---

## 📊 Expense Categories

1. 🍔 **Food** - Groceries, restaurants, food delivery
2. 🚗 **Transportation** - Fuel, public transport, taxi
3. 🛒 **Shopping** - Clothes, electronics, personal items
4. 💡 **Bills** - Electricity, water, internet, rent
5. 🎬 **Entertainment** - Movies, games, subscriptions
6. ⚕️ **Healthcare** - Medical, pharmacy, insurance
7. 📚 **Education** - Books, courses, tuition
8. 📦 **Others** - Miscellaneous expenses

---

## 🎯 Features Implementation

### Client-side Validation
- Required field validation
- Email format validation
- Password length validation
- Amount positive value check

### Server-side Validation
- Mongoose schema validation
- JWT token verification
- Password encryption
- Input sanitization

### Security Features
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for authentication
- Protected API routes
- CORS enabled
- Environment variables for secrets

---

## 📸 Screenshots

*(Add screenshots here after running the project)*

1. Home Page
2. Registration Page
3. Login Page
4. Dashboard with Charts
5. Add Expense Form
6. Expense Table with Edit/Delete

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Check MONGO_URI in .env file
Verify MongoDB Atlas whitelist includes your IP
```

### Port Already in Use
```
Solution: Change PORT in .env file
Or kill process using port 5000
```

### JWT Token Error
```
Solution: Clear localStorage and login again
Verify JWT_SECRET is set in .env
```

---

## 🚢 Deployment

### Deploy to Render
1. Create account at [render.com](https://render.com)
2. Connect GitHub repository
3. Create new Web Service
4. Add environment variables
5. Deploy application

### Deploy Frontend to Netlify
1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop views + public folders
3. Update API_URL in HTML files
4. Deploy

---

## 📝 Report Structure

### Chapter 1: Introduction
- Problem statement
- Objectives
- Scope of project

### Chapter 2: System Analysis
- Existing system
- Proposed system
- Feasibility study

### Chapter 3: System Design
- Architecture diagram
- Database schema
- Use case diagrams

### Chapter 4: Implementation
- Code snippets
- Testing results
- Screenshots

---

## 🎓 Project Rubric

| Criterion | Points | Implementation |
|-----------|--------|----------------|
| Design | 5 | Bootstrap + Custom CSS + Charts |
| Input Validation | 5 | Client & Server validation |
| Integration | 10 | Full CRUD + MongoDB |
| GitHub | 2 | Complete repository |
| Viva | 10 | Demonstrable features |
| Report | 3 | Professional documentation |
| **TOTAL** | **35** | ✅ Complete |

---

## 👨‍💻 Author

**Your Name**  
Roll No: Your Roll Number  
Email: your.email@example.com  
Course: 23CS2048 - Web Technology

---

## 📄 License

MIT License - Feel free to use for educational purposes

---

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Chart.js for data visualization
- Bootstrap for responsive design
- Font Awesome for icons

---

## 📞 Support

For issues or questions:
- Email: your.email@example.com
- GitHub Issues: [Create an issue](your-repo-url/issues)

---

**Made with ❤️ for Web Technology Project**