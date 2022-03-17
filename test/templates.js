exports.axiosConfig = {
    "Content-Type" : "application/json"
}

exports.productTemplate = {
    name: 'Test Product',
    imageUrl: 'https://images.unsplash.com/photo-1621951833860-c1ceea369593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60',
    description: 'Magna veniam aliqua non cupidatat minim amet nostrud aliquip reprehenderit amet incididunt. Ex fugiat nostrud fugiat laborum veniam irure esse fugiat. Laboris amet quis et et amet culpa cupidatat sunt do enim.',
    price: 1000,
    inStock: 10,
    tag: 'Shirt',
    options: 'SML'.split('')
}

exports.orderTemplate = { 
    amount: 2000,
    created_on: new Date(),
    items: [
        {
            _id: '61fc9a2054b75488f1ea5d40',
            name: 'Test 1',
            imageUrl: 'https://images.unsplash.com/photo-1621951833860-c1ceea369593?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60',
            description: 'Making a product that should render on the shop page',
            price: 2000,
            inStock: 10,
            tag: 'Shirt',
            options: ['XS,S,M,L,XL,XXL'.split(',')]
            
        },
        {
            _id: '61fca16670fcabc6405a57b5',
            name: 'Product 2',
            imageUrl: 'https://images.unsplash.com/photo-1613447326896-c7b8a0ab9b43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHQlMjBzaGlydHxlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60',
            description: 'Magna veniam aliqua non cupidatat minim amet nostrud aliquip reprehenderit amet incididunt. Ex fugiat nostrud fugiat laborum veniam irure esse fugiat. Laboris amet quis et et amet culpa cupidatat sunt do enim.',
            price: 1400,
            inStock: 17,
            options: ['XS,S,M,L,XL,XXL'.split(',')]
        }
    ],
    shipping_address: '1900 E Apache Blvd Apt 1064',
    shipping_state: 'AZ',
    shipping_city: 'Tempe',
    shipping_zip: '85281'
}


exports.transactionTemplate = { 
    order_ref: '62001ab7ba5ba0c905b27b0a',
    subtotal: 1000,
    tax: 80,
    total: 1080,
    created_on: new Date(),
    customer_email: 'andrewbloese@gmail.com'
}