import React, { useState, useEffect } from "react";
import { getAllLogsheets, verifyLogsheet } from "../services/logsheetService";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";

function VerifyLogsheet() {
  const [logsheets, setLogsheets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogsheets = async () => {
    setLoading(true);
    try {
      const res = await getAllLogsheets();
      setLogsheets(
        res.data.filter(
          (l) => l.verificationStatus === "Pending" || l.verificationStatus
        )
      );
    } catch (err) {
      toast.error("Error fetching logsheets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsheets();
  }, []);

  const handleVerify = async (logsheet, action) => {
    try {
      const request = {
        verifierId: 1, // replace with logged-in user id
        verificationStatus: action, // "Verified" or "Rejected"
      };
      await verifyLogsheet(logsheet.id, request);
      toast.success(`Logsheet ${action} successfully`);
      fetchLogsheets();
    } catch (err) {
      toast.error("Error updating logsheet");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Verify Logsheets</h2>
      {loading ? (
        <p>Loading...</p>
      ) : logsheets.length === 0 ? (
        <p>No logsheets to verify</p>
      ) : (
        <Table striped bordered hover>
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Entry Type</th>
              <th>Staff</th>
              <th>Description</th>
              <th>Verified By</th>
              <th>Verified At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logsheets.map((ls) => (
              <tr key={ls.id}>
                <td>{ls.id}</td>
                <td>{ls.logDate?.split("T")[0]}</td>
                <td>{ls.entryType}</td>
                <td>{ls.staffId}</td>
                <td>{ls.description}</td>
                <td>{ls.verifiedById || "-"}</td>
                <td>{ls.verifiedAt?.split("T")[0] || "-"}</td>
                <td>{ls.verificationStatus}</td>
                <td>
                  {ls.verificationStatus === "Pending" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleVerify(ls, "Verified")}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleVerify(ls, "Rejected")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default VerifyLogsheet;
