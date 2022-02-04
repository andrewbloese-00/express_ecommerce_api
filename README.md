#Express Commerce 🛍


## About
This is an express REST API that uses mongoDB as its database and stripe to process payments. Part of an ongoing project to create a commerce library. 

## Schema 
### Order
* amount  : The total cost of the order
* created_on :  the date the order was 
* items: an array of Products ordered in the 
* shipping_address: the first line of the 
* shipping_city: the city of the shipping address 
* shipping_state: the state of the shipping address
* shipping_zip: the ZIP / postal code of the shipping address	

### User
* name : The user’s name
* email : user’s email used to register
* password: the hashed password is stored for comparison for authorization. The password is never seen  by anyone but the user. 
* orders: an array containing the mongoDB _ids of order documents belonging to the user.  
* created_on: the date the user signed up
* resetPasswordToken : initially unset on creation, set upon a ‘forgot password ‘ request . It is just a string 

### Transaction
* order_ref: the mongoose document id of the order corresponding to the transaction. (String) 
* subtotal: the order subtotal (Float)
* tax: the amount of tax on the order (Float)
* total: the transaction total (Float)
* created_on: the date the transaction was created (Date) 
* customerEmail: the email of the customer associated with the transaction (String)

### Product
* name: The product's name (String)
* imageUrl: The url to the product image (String)
* description: A description of the product (String)
* price: The price of the product in cents (int) 
    > EX: $10.00 product --> product.price = 1000
* inStock: The count of the item in stock; used for tracking stock (int)
* tag: The filter tag of the item (String)
* options: an array of options that can be selected ([String])


## Endpoints

### Products
GET  `/api/products/` - gets all products from the database and returns them in an array. 

GET `/api/products/:id` - gets a product with _id matching the “:id” url param. 

POST `/api/products/create` - creates a product with ...
```
// ** Product ** \\
//request
request.body{
    name, 
    imageUrl, 
    description, 
    price,
    inStock,
    tag,
    options,
}

```

### Payments

POST `/api/stripe_access/payment` - receives data to create and process a payment through stripe. 

```
// ** Payment ** \\
//request
request.body : {
	amount, 	// The amount to charge in cents 
	id 			// This is payment method
}


//response - success
{
	message: "Payment success"
	success: true
	data: payment

}

//response - fail
{
	message: "Payment failed"
	success: false
    data: null
}

```


### Orders
GET  `/api/orders` - Returns all orders
 
GET  `/api/orders/:id` - Returns order with matching id

POST `/api/orders/create`  - creates a  user with …

```
//createOrder
request.body: {
 	amount,
  created_on,
  items,
  shipping_address,
  shipping_state
  shipping_city,
  shipping_zip,
  transaction_ref       
}
```




### Transactions
GET  `/api/transactions/` - Returns all transactions 

GET  `/api/transactions/:id` - Returns transaction with matching id

POST  `api/transactions/create`  - creates a transaction with …
```
//createTransaction
request.body: { 
	order_ref, 
	subtotal, 
	tax, 
	total, 
	created_on,
	customerEmail,
}
```


### Auth 
POST `/api/auth/register`  = creates a user with … 
```
// ** register ** \\
req.body : { 
	name , 
	email , 
	password, 
	passwordConfirm,
}

//response 
{
	user , token
}
```


POST `/api/auth/login` - logs in a user with their email and password, if credentials are valid the user is sent a token , otherwise it responds with an error message. \

```
// ** login ** \\
//request
req.body : {
	email ,
	password , 
}

//response 
{
	user , token
}
```


### User 
GET `/api/users/`  - uses a protection middleware to check that the user has the proper token in the authorization headers , if it does

```
//response
data: { 
	username : String ,
	email : String ,
	orders: [ String ] // Strings are order IDs 
	addresses : [
		{
			street_address: String ,
			state: String , 
			city: String , 
			zip: String , 
		} ,
		... 
	]
}
```

* Note that the returned user object doesn't contain the stored hashed password from the Mongo Atlas Database. 

