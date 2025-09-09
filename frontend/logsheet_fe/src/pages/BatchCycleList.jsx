
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBatchCycles } from "../services/batchCycleApi";

const BatchCycleList = () => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBatchCycles()
      .then((arr) => setCycles(arr))
      .catch((err) => alert(`Failed to fetch batch cycles: ${err.message}`))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="batch-container">
      <h2>All Batch Cycles</h2>
      <div style={{ marginBottom: 12 }}>
        {/* <Link to="/">+ Create New</Link> */}
      </div>
      {cycles.length === 0 ? (
        <p>No batch cycles yet.</p>
      ) : (
        <ul>
          {cycles.map((c) => (
            <li key={c.id}>
              <Link to={`/batch-cycles/${c.id}`}>
                <strong>{c.title}</strong>
              </Link>{" "}
              ({c.startDate} → {c.endDate})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BatchCycleList;
