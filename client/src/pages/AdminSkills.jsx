import { useState, useEffect } from "react";
import api from "../api"; // ✅ FIX
import toast from "react-hot-toast";

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "" });

  // 🔥 FETCH SKILLS
  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      console.log("SKILLS API:", res.data);
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

  // 🔥 ADD SKILL
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
    <div className="p-4">
      <h1 className="text-xl font-bold">Skills</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white px-4 py-2 mt-4"
      >
        Add Skill
      </button>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : skills.length === 0 ? (
        <p>No skills found</p>
      ) : (
        skills.map((s) => <div key={s._id}>{s.name}</div>)
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Add Skill</h2>

            <form onSubmit={handleAdd}>
              <input
                className="border w-full p-2 mb-4"
                placeholder="Skill name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <button className="bg-green-500 text-white px-4 py-2 w-full">
                Save
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-red-500"
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