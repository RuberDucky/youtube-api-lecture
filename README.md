# YouTube API Lecture 

A RESTful API for a YouTube-like application built with Express and Sequelize.

## Features

-   User authentication (signup, login)
-   Video management
-   Database integration with Sequelize ORM

## Installation

1. Clone the repository:

```
git clone https://github.com/RuberDucky/youtube-api-lecture
cd youtube
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

```
cp .env.example .env
```

Edit the `.env` file with your configuration.

4. Start the server:

```
npm start
```

## API Endpoints

### Authentication

-   `POST /api/auth/signup` - Register a new user
-   `POST /api/auth/login` - Login a user

## Technologies

-   Node.js
-   Express.js
-   Sequelize ORM
-   MySQL/PostgreSQL

## License

MIT
