
# Blog Platform

This is a backend application that provides APIs for managing posts, likes, and comments. It uses Prisma as the ORM to interact with the database and includes user authentication, post creation, and like management features.

---

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Database Configuration](#database-configuration)
- [API Endpoints](#api-endpoints)
- [Prisma Schema](#prisma-schema)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [License](#license)

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/project-name.git
   ```

2. Navigate to the project directory:

   ```bash
   cd project-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Setup

1. Create a `.env` file in the root directory and set the database URL:

   ```env
   DATABASE_URL="your-database-connection-string"
   ```

2. Set up the database by running the Prisma migration:

   ```bash
   npx prisma migrate dev
   ```

3. Generate the Prisma client:

   ```bash
   npx prisma generate
   ```

---

## Database Configuration

This project uses **Prisma** for ORM. The schema is defined in the `prisma/schema.prisma` file.

To apply the migrations to your database:

```bash
npx prisma migrate dev
```

---

## API Endpoints

### User Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login a user and receive an authentication token.

### Post Endpoints

- **GET /posts**: Get all posts.
- **GET /posts/:id**: Get a single post by ID.
- **POST /posts**: Create a new post (authentication required).
- **PUT /posts/:id**: Update a post (authentication required).
- **DELETE /posts/:id**: Delete a post (authentication required).

### Like Endpoints

- **POST /posts/:id/like**: Like a post (if already liked, unlike it).
- **GET /posts/:id/likes**: Get all likes for a post.

### Comment Endpoints

- **POST /posts/:id/comments**: Add a comment to a post.
- **GET /posts/:id/comments**: Get all comments for a post.

---

## Prisma Schema

### `Post` Model:

```prisma
model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String
  authorId  Int
  imageUrl  String?
  author    User      @relation(fields: [authorId], references: [id])
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
  likes     Like[]
}
```

### `Like` Model:

```prisma
model Like {
  id       Int  @id @default(autoincrement())
  postId   Int
  post     Post @relation(fields: [postId], references: [id])
  authorId Int
  author   User @relation(fields: [authorId], references: [id])

  @@unique([postId, authorId])
}
```

---

## Running the Application

1. To run the development server:

   ```bash
   npm run dev
   ```

2. The application will be available at `http://localhost:3000`.

---

## Testing

To run tests, use:

```bash
npm run test
```

---

## License

This project is licensed under the MIT License.

---
