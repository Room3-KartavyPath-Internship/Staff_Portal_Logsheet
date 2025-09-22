import { createContext, useState, useEffect } from "react";
import { getSubjects } from "../services/subjectApi";
import { toast } from "react-toastify";

export const SubjectsContext = createContext();

export function SubjectsProvider({ children }) {
    const [subjects, setSubjects] = useState([]);

    const fetchSubjects = async () => {
        try {
            const res = await getSubjects();
            setSubjects(res.data);
        } catch (err) {
            toast.error("Failed to load subjects");
        }
    };

    useEffect(() => { fetchSubjects(); }, []);

    return (
        <SubjectsContext.Provider value={{ subjects, fetchSubjects }}>
            {children}
        </SubjectsContext.Provider>
    );
}
