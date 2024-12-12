# Doctor Appointment Booking System (Website) 
Developed a responsive system using React, Tailwind CSS, and MongoDB with features like appointment scheduling, Stripe payments, JWT authentication, and an admin panel for efficient management.

<!--   ## Demo -->

<!-- [medistore.jhasuraj.com](https://medistore.jhasuraj.com) -->


## Features

- Appointment Management
    - Book Appointments
    - View and Manage Booked Appointments
    - Cancel Appointments
- Doctor Management
    - Add New Doctors
    - Update Doctor Details
    - View All Registered Doctors
- Payment Processing
    - Secure Payments with Stripe and Razorpay
    - View Payment History
- User Authentication
   - JWT-Based Secure Login/Signup
   - Manage User Profiles
- Admin Panel
    - Manage Doctors and Appointments
    - View Analytics and Reports
## Authors

- [udham8306](https://github.com/udham8306)


## Tech Stack

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/)
- [Razorpay](https://razorpay.com/)
- [Cloudinary](https://cloudinary.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT (JSON Web Token)](https://jwt.io/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en/)

## Environment Setup

- Download and install the latest node and npm from https://nodejs.org/en/download/

## Links for Technology Installation/Documentation:

- **[MongoDB](https://www.mongodb.com/)**: NoSQL database setup and documentation.
- **[Stripe](https://stripe.com/docs)**: Official Stripe documentation for setting up payment processing.
- **[Razorpay](https://razorpay.com/docs/)**: Guide for setting up Razorpay payment gateway.
- **[Cloudinary](https://cloudinary.com/documentation)**: Documentation for integrating Cloudinary for image/video storage and management.
- **[Axios](https://axios-http.com/docs/intro)**: Official Axios documentation for making HTTP requests in Node.js and the browser.

This should provide the necessary links and steps for installing and integrating each of the technologies in your project.


## Run Locally

Clone the project

```bash
  git clone https://github.com/udham8306/Doctor-Appointment-Booking-System.git
```

Go to the project directory

```bash
  cd Doctor-Appointment-Booking-System
```
### Setting Up Backend
  Navigate to the backend folder:
  ```bash
       cd backend
  ```
 Install dependencies:
 ```bash
      npm install
 ```
 Create a .env file and add any required environment variables (e.g., database connection strings, API keys). Here’s an example:
 ```bash
     MONGODB_URI = 'mongodb+srv'
     CLOUDINARY_NAME =""
     CLOUDINARY_API_KEY = ''
     CLOUDINARY_SECRET_KEY = ''
     ADMIN_EMAIl = 'admin@prescripto.com'
     ADMIN_PASSWORD = "qwerty123"
     JWT_SECRET = ""
     RAZORPAY_KEY_ID = ""
     RAZORPAY_KEY_SECRET = ""
     CURRENCY = "INR"
 ```
Start the backend server
```bash
    npm run dev
```
### Setting Up Frontend
Navigate to the frontend folder:
  ```bash
       cd frontend
  ```
 Install dependencies:
 ```bash
       npm install
 ```
 Create a .env file and add any necessary frontend environment variables (e.g., API URL). Example:
 ```bash
        VITE_BACKEND_URL = "http://localhost:4000"
        VITE_RAZORPAY_KEY_ID = ""
 ```
Start the frontend server
```bash
    npm run dev
```
### Setting Up Admin Panel
Navigate to the admin folder:
  ```bash
       cd admin
  ```
 Install dependencies:
 ```bash
       npm install
 ```
 Create a .env file in the admin directory and add any required environment variables such as the API URL. Example:
 ```bash
       VITE_BACKEND_URL = 'http://localhost:4000'
 ```
Start the admin server
```bash
    npm run dev
```


## Screenshots

Home Page
![image](https://github.com/user-attachments/assets/1a3bf131-3978-41ab-bca2-a10685302d74)

User Profile : Update or Edit
![image](https://github.com/user-attachments/assets/eec3b433-8ed2-4d25-b245-238acf3757e4)

My Appointment Section:
![Image](https://github.com/user-attachments/assets/7eae3154-705f-4da7-8810-301f45ee4959)

Doctor Booking Page
![Image](https://github.com/user-attachments/assets/7449c083-80cd-4ea7-924f-bdaa687c5c9e)

Admin Panel :  Dashboard
![Image](https://github.com/user-attachments/assets/1dc15106-3c0b-43fa-8763-d9f489309d72)

Admin Panel : Appointments
![Image](https://github.com/user-attachments/assets/0b721041-0ae3-4fad-871a-dbc469383fa4)

Admin Panel : Upload a Doctor
![Image](https://github.com/user-attachments/assets/be360728-17f4-40c0-87ad-c4968c7c6f86)
Admin Panel : ALL Doctors
![Image](https://github.com/user-attachments/assets/d30205f3-3f70-41f6-905f-c26ed6aee517)

## Appendix

This project was developed independently by [@udham8306](https://www.github.com/udham8306).


