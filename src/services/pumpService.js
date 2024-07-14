import { v4 as uuidv4 } from "uuid";

// mock db
let pumps = [
    {
        id : uuidv4(),
        name: '1',
        products: ["SUPER E10", "Diesel"],
        zipCode: 80939,
        status: 'online'
    },
    {
       id: uuidv4(),
       name: '2',
       products: ["SUPER E10", "Diesel"],
       zipCode:  80938,
       status: 'offline',
    },
]

const getAll = () => Promise.resolve(pumps);
const getById = (id) => Promise.resolve(pumps.find((pump) => pump.id == id));

const createPump = (pump) => {
    pumps.push(pump) 
    return Promise.resolve(pump)
};

const deletePump = (id) => {
    pumps = pumps.filter((pump)=> pump.id !=id);
    return Promise.resolve(pumps)
}

const updatePump = (pump) => {
    const oldPump = pumps.find((oldPump) => pump.id == oldPump.id)
    pumps = pumps.filter((pump)=> pump.id !== oldPump.id);
    pumps.push(pump);
    return Promise.resolve(pumps)
}

const pumpService = { getAll, getById, deletePump, updatePump, createPump};
export default pumpService
