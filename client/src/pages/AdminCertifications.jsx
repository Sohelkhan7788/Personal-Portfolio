import { useState, useEffect } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";

const AdminCertifications = () => {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    issuer: "",
    link: "",
  });

  // ==============================
  // 🔥 FETCH
  // ==============================
  const fetchCerts = async () => {
    try {
      const res = await api.get("/certifications");
      setCerts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch certifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  // ==============================
  // 🔥 ADD (FIXED)
  // ==============================
  const handleAdd = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.title.trim()) {
      return toast.error("Title is required");
    }

    // ✅ CLEAN DATA
    const data = {
      title: form.title.trim(),
      issuer: form.issuer?.trim() || "",
      link: form.link?.trim() || "",
    };

    console.log("🚀 Sending:", data);

    try {
      await api.post("/certifications", data);

      toast.success("Certification added");

      setShowModal(false);
      setForm({ title: "", issuer: "", link: "" });

      fetchCerts();
    } catch (err) {
      console.error("❌ ERROR:", err?.response?.data);

      toast.error(
        err?.response?.data?.message || "Failed to add certification"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-gray-400 text-sm">
            {certs.length} total certifications
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-primary px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition"
        >
          <HiPlus /> Add Certification
        </button>
      </div>

      {/* LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : certs.length === 0 ? (
        <p className="text-gray-400">No certifications found</p>
      ) : (
        <div className="grid gap-4">
          {certs.map((c) => (
            <div
              key={c._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-lg"
            >
              <h3 className="font-semibold text-lg">{c.title}</h3>
              <p className="text-gray-400 text-sm">{c.issuer}</p>

              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary text-sm mt-2 inline-block"
                >
                  View Certificate →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ==============================
          🔥 MODAL (UNCHANGED UI)
      ============================== */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center px-4">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">

            <h2 className="text-xl font-bold mb-4">
              Add Certification
            </h2>

            <form onSubmit={handleAdd} className="space-y-4">

              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary outline-none"
                required
              />

              <input
                type="text"
                placeholder="Issuer"
                value={form.issuer}
                onChange={(e) =>
                  setForm({ ...form, issuer: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="text"
                placeholder="Certificate Link"
                value={form.link}
                onChange={(e) =>
                  setForm({ ...form, link: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-primary outline-none"
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

export default AdminCertifications;