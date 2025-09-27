import React, { useState, useEffect } from "react";
import { getAllLogsheets, approveLogsheet } from "../services/logsheetService";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";

function ApproveLogsheet() {
  const [logsheets, setLogsheets] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user")); 

  const fetchLogsheets = async () => {
    setLoading(true);
    try {
      const res = await getAllLogsheets();
      setLogsheets(res.data.filter((l) => l.verificationStatus === "Verified")); 
    } catch (err) {
      toast.error("Error fetching logsheets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogsheets();
  }, []);

  const handleApprove = async (logsheet, action) => {
    try {
      const request = {
        approverId: user.id, 
        approvalStatus: action, 
      };
      await approveLogsheet(logsheet.id, request);

      setLogsheets((prev) =>
        prev.map((l) =>
          l.id === logsheet.id
            ? {
                ...l,
                approvalStatus: action,
                approvedById: user.id,
                approvedAt: new Date().toISOString(),
              }
            : l
        )
      );

      toast.success(`Logsheet ${action} successfully`);
    } catch (err) {
      toast.error("Error updating logsheet");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Approve Logsheets</h2>
      {loading ? (
        <p>Loading...</p>
      ) : logsheets.length === 0 ? (
        <p>No verified logsheets to approve</p>
      ) : (
        <Table striped bordered hover>
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Entry Type</th>
              <th>Description</th>
              <th>Approved By</th>
              <th>Approved At</th>
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
                <td>{ls.description}</td>
                <td>{ls.approvedById || "-"}</td>
                <td>{ls.approvedAt?.split("T")[0] || "-"}</td>
                <td>{ls.approvalStatus}</td>
                <td>
                  {ls.approvalStatus === "Pending" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        onClick={() => handleApprove(ls, "Approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleApprove(ls, "Rejected")}
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

export default ApproveLogsheet;
