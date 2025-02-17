import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ModpackList } from "../components/ModpackList";
import { ModpackForm } from "../components/ModpackForm";
import { Modpack } from "../types";
import { logout } from "../lib/auth";
import { LogOut, Plus } from "lucide-react";
import { pb } from "../lib/pb";
import { RecordModel } from "pocketbase";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [modpacks, setModpacks] = useState<Modpack[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingModpack, setEditingModpack] = useState<Modpack | undefined>();

  useEffect(() => {(async () => {
    const modpacks = await pb.collection("modpacks").getFullList({ expand: "subversions.distributions" })
    console.log(modpacks);
    setModpacks(modpacks.map((m: RecordModel) => ({
      id: m.id,
      mid: m.mid,
      name: m.name,
      fullName: m.full_name,
      minecraftVersion: m.minecraft_version,
      modpackLink: m.link,
      subversions: m.expand?.subversions.map((s: RecordModel) => ({
        id: s.id,
        sid: s.sid,
        distributions: s.expand?.distributions.map((d: RecordModel) => ({
          id: d.id,
          name: d.name,
          link: d.link
        })) || [],
      })) || [],
    })));
  })()}, []);



  const handleSubmit = (data: Modpack) => {
    if (editingModpack) {
      pb.collection("modpacks").update(editingModpack.id, data);
    } else {
      pb.collection("modpacks").create(data);
    }
    setIsFormOpen(false);
    setEditingModpack(undefined);
  };

  const handleEdit = (modpack: Modpack) => {
    setEditingModpack(modpack);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this modpack?")) {
      return;
    }
    await pb.collection("modpacks").delete(id);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Modpack Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus size={20} className="mr-2" /> Add Modpack
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <LogOut size={20} className="mr-2" /> Logout
            </button>
          </div>
        </div>

        {isFormOpen ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <ModpackForm
              initialData={editingModpack}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingModpack(undefined);
              }}
            />
          </div>
        ) : (
          <ModpackList
            modpacks={modpacks}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};
