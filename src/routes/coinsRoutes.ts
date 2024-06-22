import { Router } from "express";
import { CoinController } from "../controllers/coinController";

const coinsRouter = Router();

const coinController = new CoinController();

coinsRouter.get("/", coinController.getAll);
coinsRouter.post("/", coinController.create);

coinsRouter.get("/:id", coinController.getById);
coinsRouter.put("/:id", coinController.update);
coinsRouter.delete("/:id", coinController.delete);

export default coinsRouter;
