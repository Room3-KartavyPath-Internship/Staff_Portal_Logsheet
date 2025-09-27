import { createContext, useState, useEffect, useContext } from "react";
import { getSubjects } from "../services/subjectApi";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext"; 

export const SubjectsContext = createContext();

export function SubjectsProvider({ children }) {
  const [subjects, setSubjects] = useState([]);
  const { user } = useContext(AuthContext); 

  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) {
      if (err.response?.status !== 401) {
       
        toast.error("Failed to load subjects");
      }
    }
  };

  useEffect(() => {
    
    if (user) {
      fetchSubjects();
    } else {
      setSubjects([]); 
    }
  }, [user]);

  return (
    <SubjectsContext.Provider value={{ subjects, fetchSubjects }}>
      {children}
    </SubjectsContext.Provider>
  );
}
