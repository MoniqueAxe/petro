import express from "express";
import adressService from "../services/addressService.js"

const router = express.Router();

router.get("/", async function (req, res) {

 adressService
    .getAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.get("/:zipCode", async function (req, res) {

    adressService
    .getById(req.params.zipCode)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

export default router