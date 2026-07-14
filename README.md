# 🛒 Lipa Mdogo Shop

A full-stack e-commerce web application that allows customers to browse products, add items to their cart, and make payments through M-Pesa STK Push. The platform also provides an admin dashboard for managing products and inventory.

## 🚀 Live Demo

- Frontend: <YOUR_FRONTEND_RENDER_URL>
- Backend API: <YOUR_BACKEND_RENDER_URL>

---

## ✨ Features

### Customer
- Browse products
- Search for products
- View product details
- Add and remove items from cart
- Secure checkout
- Pay using M-Pesa STK Push (Sandbox)
- Contact support via WhatsApp
- Live chat with Tawk.to
- Responsive design for desktop and mobile

### Admin
- Secure admin login
- Add new products
- Edit products
- Delete products
- Upload product images with Cloudinary
- Manage inventory

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Integrations
- Cloudinary
- Safaricom M-Pesa Daraja API (Sandbox)
- Tawk.to
- WhatsApp Chat

### Deployment
- Render
- GitHub

---

## 📁 Project Structure

Frontend

src/
├── components/
├── pages/
├── context/
├── assets/
└── App.jsx

Backend

controllers/
models/
routes/
middleware/
config/
server.js

---

## ⚙️ Installation

### Clone the repositories

git clone <frontend-repository-url>

git clone <backend-repository-url>

### Install dependencies

Frontend

npm install

Backend

npm install

### Run

Frontend

npm run dev

Backend

npm start

---

## 🔐 Environment Variables

Backend (.env)

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

MPESA_CONSUMER_KEY=

MPESA_CONSUMER_SECRET=

MPESA_SHORTCODE=

MPESA_PASSKEY=

CALLBACK_URL=

Frontend (.env)

VITE_API_URL=

VITE_TAWK_PROPERTY_ID=

VITE_TAWK_WIDGET_ID=

VITE_WHATSAPP_NUMBER=

---

## 📡 API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Products

GET /api/products

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id

### Orders

POST /api/orders

GET /api/orders

### Payments

POST /api/mpesa/stkpush

POST /api/mpesa/callback

---

## 📸 Screenshots

Add screenshots here after uploading them.

- Home Page
- Product Page
- Cart
- Checkout
- Admin Dashboard

---

## 🔮 Future Improvements

- Production M-Pesa integration
- Email notifications
- Product reviews and ratings
- Wishlist
- Order tracking
- Discount coupons
- Multi-vendor support
- Progressive Web App (PWA)

---

## 👨‍💻 Author

**Glenton Agutu**

GitHub: https://github.com/glentonagutu22-creator

---

## 📄 License

This project is licensed under the MIT License.
