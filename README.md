fs-customer

A full-stack customer management system with a backend powered by Laravel and a frontend built with React.

Getting Started
1. Clone the Repository

git clone https://github.com/dandandelion/fs-customer.git
cd fs-customer

Backend Setup (Laravel)
2. Navigate to the Backend Directory

cd customer-api
3. Install Dependencies

composer install
4. Set Up Environment Variables

Copy .env.example to .env and update the database credentials:

cp .env.example .env
5. Generate Application Key

php artisan key:generate
6. Run Migrations and Seed Database (Optional)

php artisan migrate --seed
7. Start the Laravel Server

php artisan serve
The backend should now be running at http://127.0.0.1:8000.
