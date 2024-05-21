import React, { createContext, useContext, useState } from 'react';
import { Course } from '../interfaces/Course';

interface MisCursosContextoType {
    misCursos: Course[];
    agregarAlMisCursos: (course: Course) => void;
    eliminarDelMisCursos: (courseId: number) => void;
}

export const MisCursosContexto = createContext<MisCursosContextoType | undefined>(undefined);

export const useMisCursos = () => {
    const context = useContext(MisCursosContexto);
    if (!context) {
        throw new Error('useMisCursos debe estar dentro de un MisCursosProvider');
    }
    return context;
};

export const MisCursosProvider = ({ children }: { children: React.ReactNode }) => {
    const [misCursos, setMisCursos] = useState<Course[]>([]);

    const agregarAlMisCursos = (course: Course) => {
        setMisCursos((prevMisCursos) => [...prevMisCursos, course]);
    };

    const eliminarDelMisCursos = (courseId: number) => {
        setMisCursos((prevMisCursos) =>
            prevMisCursos.filter((course) => course.id !== courseId)
        );
    };

    return (
        <MisCursosContexto.Provider value={{ misCursos, agregarAlMisCursos, eliminarDelMisCursos }}>
            {children}
        </MisCursosContexto.Provider>
    );
};
