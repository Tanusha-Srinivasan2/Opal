# Opal

Opal is a full-stack e-commerce application designed to manage and display product information. It features a Spring Boot backend for handling product data and image storage, and a React.js frontend for a dynamic user experience. The application allows for adding, viewing, updating, and deleting products, as well as searching for products.


## Features

  - **Product Management**: Add, update, and delete product listings.
  - **Product Display**: View a list of all available products.
  - **Product Details**: View detailed information for each product, including description, price, category, and availability.
  - **Image Upload**: Products can be associated with an image file.
  - **Product Search**: Search for products by keyword across name, description, and category.
  - **In-memory Database**: Uses H2 Database for development and testing.
  - **Responsive Design**: Frontend components are styled using CSS modules for a modern and maintainable look.

## Architecture

### Backend

The backend is built with Spring Boot and provides RESTful APIs for product management.

  - **ProductController**: Handles HTTP requests for products, including fetching all products, getting a product by ID, adding new products with image uploads, updating products, deleting products, and searching products by keyword.
  - **ProductService**: Contains the business logic for product operations, interacting with the `ProductRepo`. It handles image storage by converting images to byte arrays.
  - **ProductRepo**: A Spring Data JPA repository for database interactions with the `Product` entity. Includes a custom query for searching products.
  - **Product Model**: Defines the `Product` entity, including fields for name, description, price, category, release date, availability, quantity, and image data.
  - **H2 Database**: An in-memory database used for development, pre-populated with some sample product data.

### Frontend

The frontend is a React.js single-page application built with Vite.

  - **App.jsx**: The main component handling routing and global product state/search functionality.
  - **Nav.jsx**: Navigation bar with links to Home, Add Product, Category, and includes a search component.
  - **ProductList.jsx**: Displays a grid of `ProductCard` components.
  - **ProductCard.jsx**: Renders individual product details in a card format.
  - **ProductDetail.jsx**: Shows comprehensive details of a selected product, including options to update or delete.
  - **AddProduct.jsx**: A form for adding new products with image upload capability.
  - **UpdateProduct.jsx**: A form for updating existing product details, including image replacement.
  - **Search.jsx**: Handles product search input and triggers the search functionality in `App.jsx`.
  - **CSS Modules**: Each component has its own associated CSS module for scoped styling.

## Tech Stack

  - **Backend**: Java 21, Spring Boot, Spring Data JPA, H2 Database
  - **Frontend**: React.js (with React 19), Vite, React Router DOM
  - **Build Tools**: Maven (for backend), npm (for frontend)

## Prerequisites

  - Java Development Kit (JDK) 21 or higher
  - Node.js (LTS version recommended)
  - npm (Node Package Manager)
  - Maven

## Getting Started

1.  **Clone the repository**

    ```bash
    git clone https://github.com/your-username/Opal.git
    cd Opal
    ```

2.  **Backend Setup**

    Navigate to the backend directory:

    ```bash
    cd backend/ecom-proj
    ```

    Build the Spring Boot application:

    ```bash
    ./mvnw clean install
    ```

    Run the Spring Boot application:

    ```bash
    ./mvnw spring-boot:run
    ```

    The backend API will be running on `http://localhost:8080`.

3.  **Frontend Setup**

    Open a new terminal and navigate to the frontend directory:

    ```bash
    cd frontend/ecomapp
    ```

    Install frontend dependencies:

    ```bash
    npm install
    ```

    Start the React development server:

    ```bash
    npm run dev
    ```

    The React frontend will be accessible at `http://localhost:5173`.

