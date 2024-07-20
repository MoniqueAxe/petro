import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { PumpSchema } from "../schemas/pump";
import z from "zod";

type Pump = z.infer<typeof PumpSchema>;

// mock db
let pumps: Pump[] = [
  {
    id: uuidv4(),
    name: "1",
    products: ["SUPER E10", "Diesel"],
    zipCode: 80939,
    status: "online",
  },
  {
    id: uuidv4(),
    name: "2",
    products: ["SUPER E10", "Diesel"],
    zipCode: 80938,
    status: "offline",
  },
];

type PageQuery = 'page' & 'pageSize'

const getAll = (query: Partial<Pump> | PageQuery) => {
  let pumpsCopy = pumps;
  
  if (query) {
    const queryEntries = Object.entries(query);
    pumpsCopy = pumpsCopy.filter((pump) => {
      return queryEntries.every(
        ([key, value]) => pump[key as keyof Pump] === value
      );
    });
  }
  return Promise.resolve(pumpsCopy);
};

const getById = (id: UUID) =>
  Promise.resolve(pumps.find((pump) => pump.id == id));

const createPump = (pump: Pump) => {
  pumps.push(pump);
  return Promise.resolve(pump);
};

const deletePump = (id: UUID) => {
  pumps = pumps.filter((pump) => pump.id != id);
  return Promise.resolve(pumps);
};

const updatePump = (pump: Pump) => {
  const index = pumps.findIndex((oldPump) => pump.id === oldPump.id);
  if (index !== -1) pumps.splice(index, 1, pump);
  return Promise.resolve(pumps);
};

const pumpService = { getAll, getById, deletePump, updatePump, createPump };
export default pumpService;
