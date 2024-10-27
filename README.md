
# Agrevo

Agrevo is a web application that connects farmers with mass buyers and individual consumers. Farmers can showcase their products for sale, and users can browse and purchase available items. This project consists of a Django backend and a Next.js frontend.

## Features
- Farmer dashboard with an option to upload and manage products
- Product listings for consumers to browse and purchase
- Authentication system to handle user access control
- Database integration to store product and user information
- API endpoints for frontend-backend communication

---

## Technologies Used
- **Backend**: Django, Django REST Framework, Flask
- **Frontend**: Next.js, Tailwind CSS, @radix-ui/react components

---

## Getting Started

### Prerequisites
- **Node.js** (version 14 or higher)
- **Python** (version 3.8 or higher)
- **npm** for frontend dependency management
- **pip** or **pipenv** for backend dependency management

---

## Project Setup

### Backend Setup (Django)
1. **Navigate to the backend folder**:

   ```bash
   cd agro_backend
   ```

2. **Create and activate a virtual environment**:

   ```bash
   python -m venv env
   source env/bin/activate  # Use `env\Scripts\activate` on Windows
   ```

3. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations to set up the database**:

   ```bash
   python manage.py migrate
   ```

5. **Create a superuser** (for admin access):

   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django server**:

   ```bash
   python manage.py runserver
   ```

   The backend server will start on `http://127.0.0.1:8000`.

---

### Frontend Setup (Next.js)
1. **Navigate to the frontend folder**:

   ```bash
   cd final_frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure `next.config.js`**:
   
   Ensure `next.config.js` includes the `images` configuration to avoid errors with image handling:

   ```javascript
   const nextConfig = {
     images: {
       domains: ['127.0.0.1'],
     },
   };

   export default nextConfig;
   ```

4. **Start the Next.js development server**:

   ```bash
   npm run dev
   ```

   The frontend server will start on `http://localhost:3000`.

---

## Troubleshooting

### Dependency Issues
- If you encounter `ERESOLVE unable to resolve dependency tree` errors, try:
  ```bash
  npm install --legacy-peer-deps
  ```

- If you see errors related to `ENOENT: no such file or directory`, ensure your `node_modules` folder is up-to-date by running:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### Authentication Issues
- If accessing certain API endpoints results in an `Unauthorized` error, ensure you are logged in and that your frontend application is correctly handling authentication tokens.

---

## License
This project is licensed under the MIT License.

