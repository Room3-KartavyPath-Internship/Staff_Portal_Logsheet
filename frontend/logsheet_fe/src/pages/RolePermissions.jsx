
// src/pages/RolePermissions.jsx
import React, { useEffect, useState } from "react";
import * as roleService from "../services/roleService";
import * as menuService from "../services/MenuItemService";
import * as permService from "../services/roleMenuPermissionService";

function unwrap(res) {
  return res?.data?.data ?? res?.data ?? res;
}

export default function RolePermissions() {
  const [roles, setRoles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permMap, setPermMap] = useState({});
  const [newRole, setNewRole] = useState({ title: "", description: "" });
  const [newMenu, setNewMenu] = useState({ title: "", path: "" });

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    try {
      const r = await roleService.getAllRoles();
      setRoles(unwrap(r) || []);

      const m = await menuService.getAllMenuItems();
      setMenus(unwrap(m) || []);
    } catch (err) {
      console.error("Load error:", err);
    }
  }

  const selectRole = async (role) => {
    setSelectedRole(role);
    try {
      const res = await roleService.getRoleById(role.id);
      const roleDto = unwrap(res);
      const map = {};
      (roleDto.menuPermissions || []).forEach(
        (p) => (map[p.menuItemId] = p.allowed)
      );
      setPermMap(map);
    } catch {
      setPermMap({});
    }
  };

  const toggle = async (menuId) => {
    if (!selectedRole) return;
    const currently = !!permMap[menuId];
    const newAllowed = !currently;

    try {
      if (permMap.hasOwnProperty(menuId)) {
        await permService.updatePermission(selectedRole.id, menuId, newAllowed);
      } else {
        await permService.createPermission({
          roleId: selectedRole.id,
          menuItemId: menuId,
          allowed: newAllowed,
        });
      }
      setPermMap((p) => ({ ...p, [menuId]: newAllowed }));
    } catch (err) {
      console.error(err);
    }
  };

  const addRole = async () => {
    if (!newRole.title) return;
    try {
      await roleService.createRole(newRole);
      setNewRole({ title: "", description: "" });
      loadAll();
    } catch (e) {
      console.error(e);
    }
  };

  const addMenu = async () => {
    if (!newMenu.title || !newMenu.path) return;
    try {
      await menuService.createMenuItem(newMenu);
      setNewMenu({ title: "", path: "" });
      const m = await menuService.getAllMenuItems();
      setMenus(unwrap(m));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* LEFT PANEL: Roles */}
      <div
        style={{
          width: "280px",
          borderRight: "1px solid #ccc",
          padding: 16,
          background: "#f9f9f9",
        }}
      >
        <h3>Roles</h3>

        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Role title"
            value={newRole.title}
            onChange={(e) =>
              setNewRole((r) => ({ ...r, title: e.target.value }))
            }
            style={{ width: "100%", marginBottom: 6 }}
          />
          <input
            placeholder="Description"
            value={newRole.description}
            onChange={(e) =>
              setNewRole((r) => ({ ...r, description: e.target.value }))
            }
            style={{ width: "100%", marginBottom: 6 }}
          />
          <button
            onClick={addRole}
            style={{
              width: "100%",
              padding: 6,
              border: "none",
              borderRadius: 4,
              background: "#3498db",
              color: "#fff",
            }}
          >
            + Add Role
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {roles.map((r) => (
            <li
              key={r.id}
              onClick={() => selectRole(r)}
              style={{
                padding: 10,
                marginBottom: 6,
                borderRadius: 6,
                cursor: "pointer",
                background:
                  selectedRole?.id === r.id ? "#dff6ff" : "transparent",
                border:
                  selectedRole?.id === r.id
                    ? "1px solid #3498db"
                    : "1px solid #ddd",
              }}
            >
              <strong>{r.title}</strong>
              <div style={{ fontSize: 12, color: "#555" }}>
                {r.description}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT PANEL: Permissions */}
      <div style={{ flex: 1, padding: 20 }}>
        {selectedRole ? (
          <>
            <h2 style={{ marginBottom: 20 }}>
              Permissions — {selectedRole.title}
            </h2>

            {/* Menu add form */}
            <div style={{ marginBottom: 16 }}>
              <input
                placeholder="Menu title"
                value={newMenu.title}
                onChange={(e) =>
                  setNewMenu((m) => ({ ...m, title: e.target.value }))
                }
                style={{ marginRight: 6 }}
              />
              <input
                placeholder="Path (e.g. /dashboard)"
                value={newMenu.path}
                onChange={(e) =>
                  setNewMenu((m) => ({ ...m, path: e.target.value }))
                }
                style={{ marginRight: 6 }}
              />
              <button
                onClick={addMenu}
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: 4,
                  background: "#2ecc71",
                  color: "#fff",
                }}
              >
                + Add Menu
              </button>
            </div>

            {/* Permissions Table */}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f1f1" }}>
                  <th style={{ textAlign: "left", padding: 8 }}>Menu</th>
                  <th style={{ textAlign: "left", padding: 8 }}>Path</th>
                  <th style={{ textAlign: "center", padding: 8 }}>Allowed</th>
                </tr>
              </thead>
              <tbody>
                {menus.map((m) => (
                  <tr key={m.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: 8 }}>{m.title}</td>
                    <td style={{ padding: 8, fontFamily: "monospace" }}>
                      {m.path}
                    </td>
                    <td style={{ textAlign: "center", padding: 8 }}>
                      <button
                        onClick={() => toggle(m.id)}
                        style={{
                          padding: "6px 12px",
                          border: "none",
                          borderRadius: 4,
                          cursor: "pointer",
                          background: permMap[m.id]
                            ? "#27ae60"
                            : "#e74c3c",
                          color: "#fff",
                        }}
                      >
                        {permMap[m.id] ? "Allowed" : "Blocked"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              color: "#888",
              marginTop: "20%",
              fontSize: 18,
            }}
          >
            Select a role from the left
          </div>
        )}
      </div>
    </div>
  );
}
