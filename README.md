## Assignment Objective

Develop a server-side application using Node.js and MongoDB and complete the following tasks.

## Task 1

- Implemented a background job that will fetch the current price in USD, market cap in USD, and 24-hour change of 3 cryptocurrencies: Bitcoin, Matic, and Ethereum, and store it in a database. This job should run once every 2 hours.
- The above details about a cryptocurrency can be fetched using an API from CoinGecko. You also have to search for the relevant API from their documentation: [CoinGecko API Documentation](https://docs.coingecko.com/v3.0.1/reference/introduction).


## Task 2

- Implemented an API `/stats`, that will return the latest data about the requested cryptocurrency.
- with Query params:  "coin": "bitcoin" 


## Task 3

- Implemented an API, `/deviation`, that will return the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.
- For example, consider the database only has 3 records for `bitcoin`, each with a price of 40000, 45000, 50000 respectively. Then the result should return 4082.48.
- with Query params: "coin": "bitcoin" 

**Optional Tasks:**

1. Completed the  Deployment in database using MongoDB Atlas 
2. Completed the  Deployment backend Render.com
