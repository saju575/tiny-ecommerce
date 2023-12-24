# Tiny E-commerce API Documentation

## Base URL

https://tiny-ecommerce.onrender.com/api

## 1.Get All Products

### Endpoint

GET /products

#### Description

Retrieve a list of all products available.

#### Example

https://tiny-ecommerce.onrender.com/api/products

## 2.Get Single Product

### Endpoint

GET /products/:id

#### Description

Retrieve details of a specific product.

#### Parameters

- `id` (string): Unique identifier of the product.

#### Example

https://tiny-ecommerce.onrender.com/api/products/658864f4b30f6d0a92963278

## 3.Create Product

### Endpoint

POST /products/create

#### Description

Create a new product.

#### Request Body

```json
{
  "title": "New Product",
  "color": ["Red", "Blue"],
  "size": ["S", "M", "L"],
  "imageUrl": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ]
}
```

## 4.User Authentication

### Login

#### Endpoint

POST /user/auth/login

Description
Authenticate a user.

Request Body

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com"
}
```

## 5.Process Registration

### Endpoint

POST /user/process-registration

Description
Register a new user.

Request Body

```
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}

```

## 6.Activate User Account

### Endpoint

GET /activate-user/:id/:token

### Description

Activate a user account by clicking on the activation link sent to the user's email.

### Parameters

- id (string): User's unique identifier.
- token (string): Activation token.
-

## 7.User Profile

### Endpoint

GET /users/profile

Description
Retrieve the profile information of the logged-in user.

Example https://tiny-ecommerce.onrender.com/api/users/profile

## 8.Logout

### Endpoint

POST /user/auth/logout

Description
Clear the user's session by logging them out.

## 9.Set Cart

### Endpoint

POST /cart/set-cart

Description
Set the user's cart with the provided data.

Request Body

```{
  "cart": [
    {
      "title": "Product Title",
      "imageUrl": "https://example.com/product-image.jpg",
      "color": "Red",
      "size": "XL",
      "productId": "product_id_here"
    }
  ]
}
```

# Environment Variables

The following environment variables are required for configuring the Tiny-Ecommerce server. Please replace the placeholder values with your actual configuration.

```plaintext
# .env

SERVER_PORT=5000
MONGODB_URL=mongodb://localhost:27017/tiny-ecomarce
JWT_ACTIVATION_KEY=your_activation_key_here
JWT_ACCESS_KEY=your_access_key_here
SMTP_EMAIL=your_email@example.com
SMTP_EMAIL_PASS=your_email_password_here
CLIENT_URL=http://localhost:5173
```

## Variable Descriptions:

    - SERVER_PORT: The port on which the server will run.
    - MONGODB_URL: The URL for connecting to your MongoDB database.
    - JWT_ACTIVATION_KEY: The secret key for JWT token activation.
    - JWT_ACCESS_KEY: The secret key for JWT token access.
    - SMTP_EMAIL: Your email address for SMTP server configuration.
    - SMTP_EMAIL_PASS: Your email password for SMTP server configuration.
    - CLIENT_URL: The URL of your client application.
