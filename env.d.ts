declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    DB_URL: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    // [key: string]: string | undefined; // Для других необъявленных переменных
  }
}
