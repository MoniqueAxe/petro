// mock db
const addresses = [
    {
        country: "Germany",
        zipCode: 80939,
        city: "München",
        houseNr: 59
    },
    {
        country: "Germany",
        zipCode: 80938,
        city: "Berlin",
        houseNr: 60
    },
]

const getAll = () => Promise.resolve(addresses);
const getById = (zipCode) => Promise.resolve(addresses.find((address) => address.zipCode == zipCode));

const adressService = { getAll, getById};
export default adressService;