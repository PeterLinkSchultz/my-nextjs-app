# Next.js Project Setup

## 📦 Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/PeterLinkSchultz/my-nextjs-app
cd your-repo
npm install
# or
yarn install
```

---

## 🛠️ Setting Up SQLite with Docker

To run SQLite in a Docker container, use the provided `.docker/docker-compose.yml` file:

```sh
docker-compose up -d
```

This will start a container with SQLite, mounted to your workspace.

### Access the SQLite Container

Run the following command to enter the container shell:

```sh
docker exec -it sqlite-container sh
```

Once inside, you can start SQLite:

```sh
sqlite3 mydatabase.db
```

---

## 🔑 Environment Variables

Create a `.env` file in the project root and add the following:

```
DB_URL="file:./mydatabase.db"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-api-key"
```

---

## 📌 Database Migrations with Prisma

After setting up SQLite, apply Prisma scheme:

```sh
npm run db:migrate
# or
yarn db:migrate
```

If neccessary apply Prisma migarations:

```sh
npm run db:migrate
# or
yarn db:migrate
```

---

## 🚀 Running the Development Server

Start the Next.js development server:

```sh
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000). 🎉

---
