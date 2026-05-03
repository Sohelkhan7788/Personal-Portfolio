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

  // ==============================
  // 🔥 FETCH SKILLS
  // ==============================
  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // ==============================
  // 🔥 ADD SKILL
  // ==============================
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/skills", form);
      toast.success("Skill added");

      setShowModal(false);
      setForm({ name: "" });

      fetchSkills();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add skill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-gray-400 text-sm">
            {skills.length} total skills
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          <HiPlus /> Add Skill
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-400">No skills found</p>
      ) : (
        <div className="grid gap-3">
          {skills.map((s) => (
            <div
              key={s._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow"
            >
              <p className="font-medium">{s.name}</p>
            </div>
          ))}
        </div>
      )}

      {/* ==============================
          🔥 MODAL
      ============================== */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">

            <h2 className="text-xl font-bold mb-4">
              Add Skill
            </h2>

            <form onSubmit={handleAdd} className="space-y-4">

              <input
                type="text"
                placeholder="Skill name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary outline-none"
                required
              />

              <button
                type="submit"
                className="w-full bg-primary py-3 rounded-lg font-semibold hover:scale-[1.02] transition shadow-lg"
              >
                Save
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-red-400 text-sm w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkills;