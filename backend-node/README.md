# Beauty Academy Backend API

Node.js + Express + MongoDB backend for Beauty Academy course enrollment and contact management system.

## 🗄️ Database Structure

**Database Name:** `sajosajo_beauty`

### Collections:

1. **course_enquiries** - Stores enrollment requests
   - Fields: name, phone, course, courseFee, message, status, timestamps
   - Status values: new, contacted, enrolled, rejected

2. **contact_messages** - Stores contact form submissions
   - Fields: firstName, lastName, email, phone, course, message, newsletter, status, timestamps
   - Status values: new, read, replied, archived

3. **users** - Admin/Staff login system
   - Fields: userid, password (hashed), status, lastLogin, role, timestamps
   - Status values: active, inactive, suspended
   - Role values: admin, staff

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Installation

1. Navigate to backend directory:
```bash
cd backend-node
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update MongoDB connection string if needed
   - Change JWT_SECRET to a secure random string

4. Start MongoDB (if running locally):
```bash
# Windows
net start MongoDB

# Or use MongoDB Compass or MongoDB Atlas
```

5. Create initial admin user (optional - run this in MongoDB shell or Compass):
```javascript
use sajosajo_beauty

db.users.insertOne({
  userid: "admin",
  password: "$2a$10$YourHashedPasswordHere",
  status: "active",
  role: "admin",
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Or use the API endpoint after server starts (see below).

6. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Public Endpoints

#### Health Check
```
GET /api/health
```

#### Submit Enrollment Enquiry
```
POST /api/enquiries
Body: {
  "name": "John Doe",
  "phone": "+91 9876543210",
  "course": "Basic Beautician Course",
  "courseFee": "15000",
  "message": "Optional message"
}
```

#### Submit Contact Message
```
POST /api/contact
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "course": "basic-beautician",
  "message": "Your message here",
  "newsletter": true
}
```

### Authentication Endpoints

#### Login
```
POST /api/auth/login
Body: {
  "userid": "admin",
  "password": "yourpassword"
}
Response: {
  "success": true,
  "token": "jwt_token_here",
  "user": {...}
}
```

#### Get Current User
```
GET /api/auth/me
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
```

### Protected Endpoints (Require Authentication)

#### Get All Enquiries
```
GET /api/enquiries?status=new&page=1&limit=20
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
```

#### Get All Contact Messages
```
GET /api/contact?status=new&page=1&limit=20
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
```

#### Update Enquiry Status
```
PUT /api/enquiries/:id
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
Body: {
  "status": "contacted"
}
```

#### Update Contact Message Status
```
PUT /api/contact/:id
Headers: {
  "Authorization": "Bearer jwt_token_here"
}
Body: {
  "status": "read"
}
```

### Admin Only Endpoints

#### Register New User
```
POST /api/auth/register
Headers: {
  "Authorization": "Bearer admin_jwt_token_here"
}
Body: {
  "userid": "staff1",
  "password": "password123",
  "role": "staff",
  "status": "active"
}
```

#### Get All Users
```
GET /api/auth/users
Headers: {
  "Authorization": "Bearer admin_jwt_token_here"
}
```

#### Update User
```
PUT /api/auth/users/:id
Headers: {
  "Authorization": "Bearer admin_jwt_token_here"
}
Body: {
  "status": "inactive"
}
```

#### Delete User
```
DELETE /api/auth/users/:id
Headers: {
  "Authorization": "Bearer admin_jwt_token_here"
}
```

#### Delete Enquiry
```
DELETE /api/enquiries/:id
Headers: {
  "Authorization": "Bearer admin_jwt_token_here"
}
```

#### Delete Contact Message
```
DELETE /api/contact/:id
Headers: {
  "Authorization": "Bearer admin_jwt_token_here"
}
```

## 🔐 Creating First Admin User

### Method 1: Using MongoDB Script

Save this as `create-admin.js` in backend-node folder:

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const User = mongoose.model('User', new mongoose.Schema({
      userid: String,
      password: String,
      status: String,
      role: String,
      lastLogin: Date
    }), 'users');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      userid: 'admin',
      password: hashedPassword,
      status: 'active',
      role: 'admin',
      lastLogin: null
    });

    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
```

Run it:
```bash
node create-admin.js
```

### Method 2: Using MongoDB Compass or Shell

1. Connect to your MongoDB database
2. Select `sajosajo_beauty` database
3. Select `users` collection
4. Insert document with hashed password (use bcrypt to hash first)

## 🔧 Environment Variables

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/sajosajo_beauty

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change in production!)
JWT_SECRET=your_secure_secret_key_here

# JWT Expiration
JWT_EXPIRE=30d

# CORS Origin
CORS_ORIGIN=http://localhost:5173
```

## 📝 Frontend Integration

The frontend is already configured to connect to this backend. Make sure:

1. Backend server is running on port 5000
2. Frontend has `.env` file with:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **Morgan** - HTTP logging
- **CORS** - Cross-origin resource sharing

## 📊 Testing the API

Use Postman, Insomnia, or any API testing tool:

1. Test health endpoint: `GET http://localhost:5000/api/health`
2. Submit test enrollment: `POST http://localhost:5000/api/enquiries`
3. Login as admin: `POST http://localhost:5000/api/auth/login`
4. Use token to access protected routes

## 🐛 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check connection string in `.env`
- Verify database name is `sajosajo_beauty`

### CORS Error
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- Default is `http://localhost:5173`

### Authentication Error
- Make sure JWT_SECRET is set in `.env`
- Check if token is being sent with "Bearer " prefix

## 📁 Project Structure

```
backend-node/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── contactController.js # Contact messages
│   └── enquiryController.js # Course enquiries
├── middleware/
│   ├── auth.js             # JWT authentication
│   └── errorHandler.js     # Error handling
├── models/
│   ├── User.js             # User schema
│   ├── ContactMessage.js   # Contact message schema
│   └── CourseEnquiry.js    # Course enquiry schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── contactRoutes.js    # Contact endpoints
│   └── enquiryRoutes.js    # Enquiry endpoints
├── .env                    # Environment variables
├── .env.example           # Example env file
├── package.json           # Dependencies
└── server.js             # Entry point
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Helmet.js security headers
- Input validation
- Error handling middleware
- CORS configuration
- Role-based access control

## 📈 Future Enhancements

- Email notifications for new enquiries
- SMS integration for phone verification
- File upload for documents
- Advanced filtering and search
- Analytics dashboard
- Export data to CSV/Excel
- Automated responses

## 📞 Support

For issues or questions, please refer to the main project documentation.
