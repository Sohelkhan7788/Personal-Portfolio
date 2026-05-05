import { useState, useEffect } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
  });

  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Skill name required");
    }

    try {
      await api.post("/skills", { name: form.name.trim() });

      toast.success("Skill added");
      setShowModal(false);
      setForm({ name: "" });
      fetchSkills();
    } catch (err) {
      console.error(err?.response?.data);
      toast.error(err?.response?.data?.message || "Failed to add skill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-gray-400 text-sm">{skills.length} total</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          <HiPlus /> Add Skill
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-400">No skills found</p>
      ) : (
        <div className="grid gap-3">
          {skills.map((s) => (
            <div key={s._id} className="bg-white/5 rounded-xl px-4 py-3">
              {s.name}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <form
            onSubmit={handleAdd}
            className="bg-[#111827] p-6 rounded-xl w-full max-w-sm space-y-4"
          >
            <input
              value={form.name}
              onChange={(e) => setForm({ name: e.target.value })}
              placeholder="Skill name"
              className="w-full p-3 bg-white/10 rounded"
            />

            <button className="w-full bg-primary py-3 rounded">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;