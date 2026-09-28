import app from './app.js';
import { initialiseLogger } from "./logger.js";

const PORT:number = parseInt(process.env.PORT || '3000', 10);

async function start() {
  await initialiseLogger();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
}

start();
