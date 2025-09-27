


import React, { useEffect, useState } from "react";
import TopicForm from "./TopicForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSections } from "../../services/sectionApi";


export default function AddTopic() {
  const { id } = useParams(); // id for edit mode
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();

  const getAuthHeader = () => {
      const user = JSON.parse(sessionStorage.getItem("user")); 
      if (user && user.token) {
        return {
          Authorization: `Bearer ${user.token}`,
        };
      }
      return {};
    };

  useEffect(() => {
    
    const fetchSections = async () => {
      try {
        const res = await getSections();
        setSections(res.data);
      } catch (err) {
        toast.error("Failed to load sections");
        console.error(err);
      }
    };
    fetchSections();

    
    if (id) {
      axios
        .get(`http://localhost:8080/api/modules/topic/${id}`,{ headers: getAuthHeader() })
        .then((res) => setTopicData(res.data))
        .catch((err) => {
          toast.error("Failed to fetch topic!");
          console.error(err);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      let res;
      if (id) {
        res = await axios.put(`http://localhost:8080/api/modules/topic/${id}`, data,{ headers: getAuthHeader() });
      } else {
        res = await axios.post("http://localhost:8080/api/modules/topic", data,{ headers: getAuthHeader() });
      }
      toast.success(res.data?.message || "Saved successfully!");
      navigate("/topics");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving topic");
      console.error(err);
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <TopicForm
        key={id || "new"}
        initialData={topicData}
        sections={sections} // 
        onSubmit={handleSubmit}
      />
    </div>
  );
}
