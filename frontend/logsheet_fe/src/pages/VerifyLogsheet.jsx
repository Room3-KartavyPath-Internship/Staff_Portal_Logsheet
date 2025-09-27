import React, { useState, useEffect } from "react";
import { getAllLogsheets, verifyLogsheet, getAllModules } from "../services/logsheetService";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";

function VerifyLogsheet() {
  const [logsheets, setLogsheets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("user")); 

  const fetchLogsheets = async () => {
    setLoading(true);
    try {
      const [logsheetsRes, moduleRes] = await Promise.all([
        getAllLogsheets(),
        getAllModules(),
      ]);

      const allLogsheets = logsheetsRes.data;
      const allModules = moduleRes.data;

      setModules(allModules);

      let filteredLogs = allLogsheets;

      if (user.role !== "Admin") {
        const userModules = allModules.filter(
          (m) => Number(m.moduleRouterId) === Number(user.id)
        );
        const userModuleIds = userModules.map((m) => m.id);

        filteredLogs = filteredLogs.filter((l) =>
          userModuleIds.includes(Number(l.moduleId))
        );
      }

      setLogsheets(
        filteredLogs.filter(
          (l) =>
            l.verificationStatus === "Pending" ||
            l.verificationStatus === "Verified"
        )
      );
    } catch (err) {
      console.error("Error fetching logsheets:", err);
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
      const payload = {
        verifierId: user.id,
        verificationStatus: action,
      };
      await verifyLogsheet(logsheet.id, payload);

      setLogsheets((prev) =>
        prev.map((l) =>
          l.id === logsheet.id
            ? {
                ...l,
                verificationStatus: action,
                verifiedById: user.id,
                verifiedAt: new Date().toISOString(),
              }
            : l
        )
      );

      toast.success(`Logsheet ${action} successfully`);
    } catch (err) {
      console.error("Error verifying logsheet:", err);
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
