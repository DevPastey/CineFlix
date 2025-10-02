declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_ID: string;
    TABLE_ID: string;
    APPWRITE_ENDPOINT: string;
    APPWRITE_PROJECT_ID: string;
    // ...add others here
  }
}
