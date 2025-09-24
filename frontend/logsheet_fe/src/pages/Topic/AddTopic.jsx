


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
  const [sections, setSections] = useState([]); // ✅ store available sections
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ fetch sections for dropdown
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

    // ✅ fetch topic if editing
    if (id) {
      axios
        .get(`http://localhost:8080/api/modules/topic/${id}`)
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
        res = await axios.put(`http://localhost:8080/api/modules/topic/${id}`, data);
      } else {
        res = await axios.post("http://localhost:8080/api/modules/topic", data);
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
        sections={sections} // ✅ pass sections to form
        onSubmit={handleSubmit}
      />
    </div>
  );
}
