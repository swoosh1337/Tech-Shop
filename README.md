https://heroic-manatee-e450b2.netlify.app/

# Tech Shop Project

Tech Shop is an eCommerce platform built with the MERN stack as a showcase of full-stack development capabilities. The project leverages React for the frontend, Node.js and Express for the backend, and MongoDB for the database. It includes a rich set of features including a shopping cart, product listings, and user authentication. The UI is enhanced with Material-UI components for a modern look and feel, and Stripe integration for secure payment processing.

## Features

- Full eCommerce functionality
- Product listings with search and filter capabilities
- Shopping cart system
- User authentication and account management
- Responsive Material-UI design
- Secure payment handling with Stripe

## Technologies

This project is built using the following technologies:

- **MongoDB**: A NoSQL database used for storing product and user data.
- **Express**: A web application framework for Node.js.
- **React**: A JavaScript library for building user interfaces.
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Material-UI**: A popular React UI framework.
- **Stripe**: An online payment processing platform.

## Local Development

To get started with local development:

```bash
# Clone the repository
git clone https://github.com/yourusername/tech-shop.git

# Navigate to the server folder and install dependencies
cd tech-shop/server
npm install

# Start the server
npm run dev

# Navigate to the client folder in a separate terminal window and install dependencies
cd tech-shop/client
npm install

# Start the React development server
npm start
```

Ensure you have a `.env` file in your server directory with the necessary environment variables.

## Environment Variables

Create a `.env` file in the `server` directory and add the following variables:

```env
DB_URI=mongodb+srv://your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_uri`, `your_stripe_secret_key`, and `your_jwt_secret` with your actual MongoDB URI, Stripe secret key, and JWT secret, respectively.

## Deployment

For deployment to production, check the documentation of your hosting provider for specific instructions on deploying a MERN stack application.

## Contributions

Contributions are welcome! Please fork the repository and open a pull request with your proposed changes.

## License

This project is open-sourced under the MIT License.
