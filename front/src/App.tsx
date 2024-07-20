import Card from "./components/card";
import { useGetPumpsQuery } from "./redux/services/pump";
import { Pump, Status } from "./types";
import { useEffect, useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import { UUID } from "crypto";
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

function App() {
  const [pumpsFiltered, setPumpsFiltered] = useState<Pump[] | undefined>(undefined);
  const [isOnline, setIsOnline] = useState<Status>('online')
  const [isNew, setIsNew] = useState<boolean>(false)

  const {data:pumps, isLoading, error} = useGetPumpsQuery();

  const handleChange = (
    dataItem : string
  )=> {
    if (pumps) {
      setPumpsFiltered(pumps.filter((pump) => pump.status === dataItem ));
    }
    setIsOnline(dataItem as Status)
  };

  useEffect(() => {
    setPumpsFiltered(pumps?.filter((pump)=> pump.status == isOnline))
  }, [setPumpsFiltered, pumps, isOnline]);

  
  return (
    <main className="bg-gray-100 min-h-screen max-w-screen">
      <div className="grid grid-cols-1 grid-rows-[1fr_1fr] gap-3 justify-center align-middle">
        <header></header>
        <div className="flex flex-wrap self-end justify-self-center">  
        <Combobox className="my-dropdown" data={["online","offline"]} onChange={handleChange} defaultValue={isOnline}></Combobox>
          <button className="m-2" onClick={(e)=> {e.preventDefault(); setIsNew(!isNew)}}>
            {!isNew ? <CiSquarePlus size={30}/> : <CiSquareMinus size={30}/>}
          </button>
        </div>
        {isLoading ? (
          <div className="self-center justify-self-center text-lg">
          <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="self-center justify-self-center text-lg">
          <p>Error loading pumps</p>
          </div>
        ) : (
          <ul>
              {isNew && <li key={uuidv4()}><Card 
              isPost={isNew}
              pump={{
              id: uuidv4() as UUID,
              name: 'example',
              products: ['Diesel'],
              zipCode: 88888,
              status: isOnline
            }}></Card></li>}
            {pumpsFiltered && pumpsFiltered.map((pump: Pump) => <li key={pump.id}><Card pump={pump}></Card></li>)}
          </ul>
        )}
        </div>
    </main>
  );
}

export default App;
