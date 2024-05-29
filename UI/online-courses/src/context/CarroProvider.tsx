//import { valuesContext, children } from "../interfaces/Values.ts";
import React, { createContext, useContext, useState,useEffect } from 'react';
import { Course } from '../interfaces/Course.ts';

interface CarroContextoType {
    carrito: Course[];
    agregarAlCarrito: (course: Course) => void;
    eliminarDelCarrito: (courseId: string) => void;
    cursoEnCarrito: (courseId: string) => boolean;
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
    const [carrito, setCarrito] = useState<Course[]>(() => {
        // Cargar carrito desde localStorage al montar
        const storedCarrito = localStorage.getItem('carrito');
        return storedCarrito ? JSON.parse(storedCarrito) : [];
    });

    useEffect(() => {
        // Guardar carrito en localStorage cada vez que se actualice
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);
    const agregarAlCarrito = (course: Course) => {
        setCarrito((prevCarrito) => [...prevCarrito, course]);
    };

    const eliminarDelCarrito = (courseId: string) => {
        setCarrito((prevCarrito) =>
            prevCarrito.filter((course) => course.id !== courseId)
        );
    };
    const cursoEnCarrito = (courseId: string) => {
        return carrito.some(course => course.id === courseId);
    };

    return (
        <CarroContexto.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, cursoEnCarrito }}>
            {children}
        </CarroContexto.Provider>
    );
};
