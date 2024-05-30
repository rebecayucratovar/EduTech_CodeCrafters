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
    const usuarioId = localStorage.getItem("usuarioId"); // Obtener el usuarioId del localStorage
    const carritoKey = `carrito_${usuarioId}`; // Clave específica para el carrito del usuario

    const [carrito, setCarrito] = useState<Course[]>(() => {
        const storedCarrito = localStorage.getItem(carritoKey);
        return storedCarrito ? JSON.parse(storedCarrito) : [];
    });

    useEffect(() => {
        localStorage.setItem(carritoKey, JSON.stringify(carrito));
    }, [carrito, carritoKey]);
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
