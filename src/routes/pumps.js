import express from "express";
import pumpService from "../services/pumpService.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.get("/", async function (req, res) {
        pumpService
       .getAll()
       .then((result) => res.status(200).send(result))
       .catch((err) => res.status(500).send(err));
   });
   
   router.get("/:id", async function (req, res) {
        pumpService
       .getById(req.params.id)
       .then((result) => res.status(200).send(result))
       .catch((err) => res.status(500).send(err));
   });

   router.post("/", (req, res) => {
    pumpService.createPump({...req.body, id: uuidv4()})
    .then((result) => res.status(201).send(result))
    .catch((err) => res.status(500).send(err));
  });

   router.delete("/:id", async function(req,res) {
    pumpService
    .deletePump(req.params.id)
    .then((result) => res.status(204).send(result))
    .catch((err) => res.status(500).send(err));
   });

   router.patch('/', async function(req,res){
    pumpService
    .updatePump({...req.body})
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
   })

   export default router;
