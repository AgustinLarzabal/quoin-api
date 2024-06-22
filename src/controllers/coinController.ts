import { Request, Response } from "express";
import { Coin } from "../models/coinModel";

export class CoinController {
  getAll = async (req: Request, res: Response) => {
    try {
      const data = await Coin.find();
      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const data = await Coin.findOneBy({ id: Number(id) });
      if (!data) {
        throw new Error("Coin not found");
      }

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const data = await Coin.save(req.body);
      console.log("data", data);
      res.status(201).json(data);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const data = await Coin.findOneBy({ id: Number(id) });
      if (!data) {
        throw new Error("Coin not found");
      }
      await Coin.update({ id: Number(id) }, req.body);
      const newData = await Coin.findOneBy({ id: Number(id) });
      res.status(200).send(newData);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const data = await Coin.findOneBy({ id: Number(id) });
      if (!data) {
        throw new Error("Coin not found");
      }
      await Coin.remove(data);
      res.status(204).send("ok");
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      }
    }
  };
}
