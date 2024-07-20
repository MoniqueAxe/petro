import express from "express";
import pumpService from "../services/pumpService";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import { ZodError } from "zod";
import { PumpSchema } from "../schemas/pump";

const router = express.Router();

router.get("/", async function (req, res) {

  pumpService
    .getAll(req.query)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", async function (req, res) {
  pumpService
    .getById(req.params.id as UUID)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.post('/', (req, res, next) => {
  try {
     
      PumpSchema.parse(req.body);
   
      pumpService
          .createPump({ ...req.body, id: uuidv4() })
          .then((result) => res.status(201).send(result))
          .catch((err) => res.status(500).send(err)); 
  } catch (err) {
      if (err instanceof ZodError) {
          return res.status(400).json({
              message: 'Bad Request',
              errors: err.errors
          });
      }
      return next(err); 
  }
});

router.delete("/:id", async function (req, res) {
  pumpService
    .deletePump(req.params.id as UUID)
    .then((result) => res.status(204).send(result))
    .catch((err) => res.status(500).send(err));
});

router.put("/", async function (req, res, next) {

  try {

    PumpSchema.parse(req.body);
    
    pumpService
        .updatePump(req.body)
        .then((result) => res.status(204).send(result))
        .catch((err) => res.status(500).send(err));
} catch (err) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: 'Bad Request',
            errors: err.errors
        });
    }
    return next(err); 
}
});



export default router;
