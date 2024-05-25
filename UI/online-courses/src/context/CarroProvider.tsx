//import { valuesContext, children } from "../interfaces/Values.ts";
import React, { createContext, useContext, useState } from 'react';
import { Course } from '../interfaces/Course.ts';

interface CarroContextoType {
    carrito: Course[];
    agregarAlCarrito: (course: Course) => void;
    eliminarDelCarrito: (courseId: string) => void;
}

export const CarroContexto = createContext<CarroContextoType | undefined>(undefined);

export const useCarro = () => {
    const context = useContext(CarroContexto);
    if (!context) {
        throw new Error('useCarro debe estar dentro de un CarroProvider');
    }
    return context;
};

export const CarroProvider = ({ children }: { children: React.ReactNode }) => {
    const [carrito, setCarrito] = useState<Course[]>([]);

    const agregarAlCarrito = (course: Course) => {
        setCarrito((prevCarrito) => [...prevCarrito, course]);
    };

    const eliminarDelCarrito = (courseId: string) => {
        setCarrito((prevCarrito) =>
            prevCarrito.filter((course) => course.id !== courseId)
        );
    };

    return (
        <CarroContexto.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
            {children}
        </CarroContexto.Provider>
    );
};
