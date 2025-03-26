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

### 5. Create Cache Folders
```bash
mkdir -p storage/framework/sessions && mkdir -p storage/framework/views && mkdir -p storage/framework/cache
```

### 6. Build and Start Docker
```bash
cd ..
docker-compose up -d --build
```

### 7. Run Migrations and Seed Database
```bash
docker exec -it php artisan migrate
docker exec -it php artisan db:seed
```

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/customers` | Fetch all customers |
| `POST` | `/api/customers` | Add a new customer |
| `PUT` | `/api/customers/{id}` | Update a customer |
| `DELETE` | `/api/customers/{id}` | Delete a customer |

---
