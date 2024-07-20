import { z } from "zod";

export const JustZip = z
  .string()
  .or(z.number())
  .refine(
    (value) => String(value).length === 5 && /^\d{5}$/.test(String(value)),
    "Invalid zip code format"
  );

export const AddressSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(3, { message: "Country is required" }),
  houseNr: z.number().gt(0, { message: "Invalid house number" }),
  zipCode: JustZip,
});
