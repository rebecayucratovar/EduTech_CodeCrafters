import { createContext, useState } from "react"
import { valuesContext, children } from "../interfaces/Values.ts";

import { Course } from "../interfaces/Course.ts";

export const CarroContexto = createContext <valuesContext>({} as valuesContext);

    export const CarroProvider = ({children} : children) => {

    const [listaCarrito, setListaCarrito] = useState<Course[]>([]);
    console.log(listaCarrito)

    const agregarAlCarrito = (item : Course) => {

        return setListaCarrito([...listaCarrito, item]) 
      }
      return(
        <CarroContexto.Provider value={{
            listaCarrito,
            agregarAlCarrito,
        }}>{children}
        </CarroContexto.Provider>
    
      )
}
