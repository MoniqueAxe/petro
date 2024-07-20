// mock db

import z from 'zod'
import {AddressSchema} from '../schemas/address';

type Address = z.infer<typeof AddressSchema>

const addresses : Address [] = [
    {
        country: "Germany",
        zipCode: 80939,
        city: "München",
        houseNr: 59,
        street:"Ingolstaedter Str."
    },
    {
        country: "Germany",
        zipCode: 80938,
        city: "Berlin",
        houseNr: 60,
        street:"Ingolstaedter2 Str."
    },
]

const getAll = () => Promise.resolve(addresses);
const getById = (zipCode: String | number) => Promise.resolve(addresses.find((address: Address) => address.zipCode === zipCode));

const adressService = { getAll, getById};
export default adressService;