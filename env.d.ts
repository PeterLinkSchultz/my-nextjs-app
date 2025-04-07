declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    DB_URL: string;
    NEXTAUTH_SECRET: string;
    OPENAI_API_KEY: string;
    // [key: string]: string | undefined; // Для других необъявленных переменных
  }
}
