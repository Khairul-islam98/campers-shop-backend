# Campers Shop Backend

## Live link:

https://campers-shop-backend-node.vercel.app



### Models:

- Product: name, description, price, stock, quantity, category, rating, image
- Order: name, email, phone, deliveryAddress, productId, totalPrice

### Endpoints:


1. Create a Product: (POST) /api/product 
2. Get All Product: (GET) /api/product
3. Get A Product: (GET) /api/product/:id
4. Update A Product: (PUT) /api/product/:id 
5. Delete A Product: (DELETE) /api/product/:id
6. Order a Prouduct: (POST) /api/order 


# How to run the application locally

1. Clone the repository

```
https://github.com/Khairul-islam98/campers-shop-backend.git
```

2. Project open

```
cd campers-shop-backend
```

3. install the required packages

```
npm i
```

4. Add a .env file

```
PORT=
DATABASE_URL=

```

5. Run the Application locally

```
npm run start:dev
```
