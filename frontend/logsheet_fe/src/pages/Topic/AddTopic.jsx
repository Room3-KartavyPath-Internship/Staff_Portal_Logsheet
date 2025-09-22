// import React, { useEffect, useState } from "react";
// import TopicForm from "./TopicForm";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// export default function AddTopic() {
//   const { id } = useParams();
//   const [topicData, setTopicData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://localhost:8080/api/modules/topic/${id}`)
//         .then((res) => {
//           // adjust this based on your API response
//           setTopicData(res.data); 
//         })
//         .catch((err) => console.error(err))
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [id]);

//   const handleSubmit = async (data) => {
//     try {
//       if (id) {
//         await axios.put(`http://localhost:8080/api/modules/topic/${id}`, data);
//       } else {
//         await axios.post("http://localhost:8080/api/modules/topic", data);
//       }
//       navigate("/topics-list");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading) return <div className="container mt-4">Loading...</div>;

//   return (
//     <div className="container mt-4">
//       <TopicForm key={id || "new"} initialData={topicData} onSubmit={handleSubmit} />
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import TopicForm from "./TopicForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddTopic() {
  const { id } = useParams();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8080/api/modules/topic/${id}`)
        .then((res) => {
          setTopicData(res.data);
        })
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

      // ✅ Show backend message
      toast.success(res.data.message || "Saved successfully!");

      navigate("/topics-list");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving topic");
      console.error(err);
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <TopicForm key={id || "new"} initialData={topicData} onSubmit={handleSubmit} />
    </div>
  );
}
