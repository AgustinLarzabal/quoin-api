import app from "./app";
import { AppDataSource } from "./db/dataSource";

const PORT = process.env.PORT ?? 1234;

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("[DB]: Database connected");
    app.listen(PORT, () => {
      console.log(`[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

main();
