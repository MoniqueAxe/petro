import { Pump, Fuel, Status } from "../types";
import {
  useAddPumpMutation,
  useDeletePumpMutation,
  useUpdatePumpMutation,
} from "../redux/services/pump";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";
import { Multiselect } from "react-widgets/cjs";


export interface CardProps {
  pump: Pump;
  isPost?: boolean
}

const Card: React.FC<CardProps> = ({ pump, isPost }): JSX.Element => {
  const [deletePump, { isLoading: isDeleting }] = useDeletePumpMutation();
  const [updatePump, { isLoading: isUpdating }] = useUpdatePumpMutation();
  const [addPump, { isLoading: isPosting }] = useAddPumpMutation();

  const [isEditing, setIsEditing] = useState<boolean>(false || !!isPost);
  const [formState, setFormState] = useState<Pump>(pump);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStatusChange = (
    dataItem : string
  )=> {
      const status = dataItem as Status;
      setFormState((prevState) => ({ ...prevState, status }));
  };

  const handleProductsChange = (
      dataItems : string[]
   ) => {
    const products = dataItems as Fuel[];
    setFormState((prevState) => ({ ...prevState, products }));
  };

  return (
    <>
      <div className={`mb-4 mt-4 mx-auto my-auto max-w-sm rounded-lg bg-white shadow-lg p-8`}>
        <div className="flex flex-col justify-between">
          <div className="mb-4">
          <div>
              <span className="p-1 text-sm">
                <strong>name:</strong>
              </span>
              {isEditing ? (
                <input
                  className="rw-widget-picker rw-widget-container p-2"
                  name="name"
                  placeholder={pump.name}
                  value={formState.name}
                  onChange={handleChange}
                ></input>
              ) : (
                <span className="text-sm">{pump.name}</span>
              )}
            </div>
            <div>
              <span className="p-1 text-sm">
                <strong>products:</strong>
              </span>
              {isEditing ? (
                <Multiselect
                defaultValue={pump.products}
                data={["Diesel", "SUPER E10"]}
                onChange={handleProductsChange}
              />
              ) : (
                <span className="text-sm">{pump.products.toString()}</span>
              )}
            </div>
            <div>
              <span className="p-1 text-sm">
                <strong>zip code:</strong>
              </span>
              {isEditing ? (
                <input
                  className="rw-widget-picker rw-widget-container p-2"
                  placeholder={pump.zipCode.toString()}
                  name="zipCode"
                  value={formState.zipCode}
                  onChange={handleChange}
                ></input>
              ) : (
                <span className="text-sm">{pump.zipCode}</span>
              )}
            </div>
            <div>
              <span className="p-1 text-sm">
                <strong>status:</strong>
              </span>
              {isEditing ? (
                  <Combobox data={["online","offline"]} onChange={handleStatusChange} defaultValue={pump.status}></Combobox>
              ) : (
                <span className="text-sm">{pump.status}</span>
              )}
            </div>
          </div>
          <div className="self-end">
            {!isPost &&(
              <button
                className="m-3"
                disabled={isDeleting || isUpdating || isPosting}
                onClick={() => {
                  deletePump(pump.id);
                }}
              >
                <FaTrashCan />
              </button>
            )}
            {!isEditing
               && (
                <button
                  className="m-3"
                  disabled={isDeleting || isUpdating || isPosting}
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <FaPencil />
                </button>
              )}
            {isEditing &&
              (
                <button
                  className="m-3"
                  disabled={ isDeleting || isUpdating || isPosting}
                  onClick={() => {
                    if (!isPost) updatePump({ ...pump, ...formState }); else {
                      addPump(formState);}
                    setIsEditing(false);
                  }}
                >
                  <AiOutlineUpload />
                </button>
              )}
            {isEditing && (
                <button className="m-3">
                  <MdOutlineCancel
                    onClick={() => {
                      setFormState(pump);
                      setIsEditing(false);
                    }}
                  />
                </button>
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
