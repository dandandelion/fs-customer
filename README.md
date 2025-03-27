# fs-customer

A full-stack customer management system with a backend powered by Laravel and a frontend built with React.

Note: This project requires docker.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/dandandelion/fs-customer.git
```
Navigate to the repository
```bash
cd fs-customer
```

---

## Project Setup

### 2. Navigate to the Backend Directory & Install Dependencies
```bash
cd customer-api
```
```bash
composer install
```

### 3. Set Up Environment Variables
Copy `.env.example` to `.env` and update the database credentials:
#### Mac/Linux Systems
```bash
cp .env.example .env
```
#### Windows Systems
```bash
copy .env.example .env
```

### 4. Create Cache Folders
#### Mac/Linux Systems
```bash
mkdir -p storage/framework/sessions && mkdir -p storage/framework/views && mkdir -p storage/framework/cache
```
#### Windows Systems
```bash
mkdir storage\framework\sessions
mkdir storage\framework\views
mkdir storage\framework\cache

```
### 5. Navigate & Build then Start Docker
```bash'
cd ..
```
```bash
docker-compose up -d --build
```

### 6. Run Migrations and Seed Database
```bash
docker exec -it customer_api php artisan migrate
```
Optionally seed database
```bash
docker exec -it customer_api php artisan db:seed
```

### 7. That's all!
Just make sure docker is running and navigate to the front-end with `http://localhost:5173`.

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|---------|------------|
| `GET` | `/api/customers/search?query` | Search for customers |
| `POST` | `/api/customers` | Add a new customer |
| `PUT` | `/api/customers/{id}` | Update a customer |
| `DELETE` | `/api/customers/{id}` | Delete a customer |

---
