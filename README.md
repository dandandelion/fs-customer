# fs-customer

A full-stack customer management system with a backend powered by Laravel and a frontend built with React.

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/dandandelion/fs-customer.git
cd fs-customer
```

---

## 🛠 Backend Setup (Laravel)

### 2. Navigate to the Backend Directory
```bash
cd customer-api
```

### 3. Install Dependencies
```bash
composer install
```

### 4. Set Up Environment Variables
Copy `.env.example` to `.env` and update the database credentials:
```bash
cp .env.example .env
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Run Migrations and Seed Database (Optional)
```bash
php artisan migrate --seed
```

### 7. Start the Laravel Server
```bash
php artisan serve
```
The backend should now be running at **http://127.0.0.1:8000**.

---

## 🖥 Frontend Setup (React)

### 8. Navigate to the Frontend Directory
```bash
cd ../customer-ui
```

### 9. Install Dependencies
```bash
npm install
```

### 10. Start the React Development Server
```bash
npm run dev
```
The frontend should now be running at **http://localhost:5173** (default Vite port).

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/customers` | Fetch all customers |
| `POST` | `/api/customers` | Add a new customer |
| `PUT` | `/api/customers/{id}` | Update a customer |
| `DELETE` | `/api/customers/{id}` | Delete a customer |

---

## 📜 License
This project is open-source and available under the MIT License.

