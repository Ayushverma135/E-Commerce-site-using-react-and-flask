# E-Commerce Website

This is an E-Commerce website project built using React for the frontend and Flask for the backend. The application allows users to browse products, add items to their cart, and make purchases. 
It also includes features such as user authentication, order management, and payment processing.

## Features
- User authentication and authorization (registration, login, logout)
- Product catalog with search and filter functionality
- Shopping cart with item management
- Order management (view order history, track order status)
- Payment processing using Stripe (or another payment gateway)
- Admin panel for managing products, categories, and orders

## Technologies Used

1. **Frontend**
  - React.js
  - Redux (for state management)
  - React Router (for navigation)
  - Axios (for API requests)
  - Bootstrap/Material-UI (for UI components)

2. **Backend**
  - Flask (Python)
  - Flask-RESTful (for creating REST APIs)
  - Flask-JWT-Extended (for JWT-based authentication)

## Prerequisites
- Node.js and npm (for the frontend)
- Python 3.x (for the backend)
- Flask
- Virtualenv (optional but recommended)

## Installation
1. **Backend Setup (Flask)**

  - Clone the repository:

        git clone https://github.com/yourusername/e-commerce-website.git
        cd e-commerce-website/backend

  - Create a virtual environment:

        python3 -m venv venv
        source venv/bin/activate  # On Windows use `venv\Scripts\activate`

  - Run the backend server:

        flask run

2. **Frontend Setup (React)**
  - Navigate to the frontend directory:

        cd ../frontend

  - Install the required dependencies:

        npm install

  - Configure your API endpoint in src/config.js:

        export const API_BASE_URL = 'http://localhost:5000/api';

  - Start the React development server:

        npm start

  - Running the Application
    
        The backend server will run at http://localhost:5000.
        The React frontend will run at http://localhost:3000.
    
To access the application, open your browser and navigate to http://localhost:3000.
