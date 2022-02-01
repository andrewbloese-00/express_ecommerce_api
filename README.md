
## Schema 
### Order
	* amount  : The total cost of the order
	* created_on :  the date the order was placed
	* items: an array of Products ordered in the transaction 
	* shipping_address: the first line of the street address 
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


## Endpoints
### Products
GET  `/api/products/` - gets all products from the database and returns them in an array. 

GET `/api/products/:id` = gets a product with _id matching the “:id” url param. 


### Payments

POST `/api/payment/` - receives data to create and process a payment through stripe. 

```
// ** Payment ** \\
//request
req.body : {
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

GET  `/api/orders` - Returns all orders 
GET  `/api/orders/:id` - Returns order with matching id


### Transactions
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

GET  `/api/transactions/` - Returns all transactions 
GET  `/api/transactions/:id` - Returns transaction with matching id

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


