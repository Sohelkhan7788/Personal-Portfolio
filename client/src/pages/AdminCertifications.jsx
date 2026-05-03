import { useState, useEffect } from "react";
import api from "../api"; // ✅ IMPORTANT FIX
import toast from "react-hot-toast";

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
  // 🔥 FETCH CERTIFICATIONS
  // ==============================
  const fetchCerts = async () => {
    try {
      const res = await api.get("/certifications");
      console.log("CERT API:", res.data);

      setCerts(res.data || []);
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
  // 🔥 ADD CERTIFICATION
  // ==============================
  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await api.post("/certifications", form);
      toast.success("Certification added");

      setShowModal(false);
      setForm({
        title: "",
        issuer: "",
        link: "",
      });

      fetchCerts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add certification");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Certifications</h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg"
      >
        Add Certification
      </button>

      {/* LIST */}
      {loading ? (
        <p className="mt-4">Loading...</p>
      ) : certs.length === 0 ? (
        <p className="mt-4 text-gray-500">No certifications found</p>
      ) : (
        <div className="mt-4 space-y-2">
          {certs.map((c) => (
            <div
              key={c._id}
              className="border p-3 rounded-lg bg-white shadow"
            >
              <p className="font-semibold">{c.title}</p>
              <p className="text-sm text-gray-500">{c.issuer}</p>

              {c.link && (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ==============================
          🔥 MODAL
      ============================== */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">
              Add Certification
            </h2>

            <form onSubmit={handleAdd} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
                className="border w-full p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Issuer"
                value={form.issuer}
                onChange={(e) =>
                  setForm({ ...form, issuer: e.target.value })
                }
                className="border w-full p-2 rounded"
              />

              <input
                type="text"
                placeholder="Certificate Link"
                value={form.link}
                onChange={(e) =>
                  setForm({ ...form, link: e.target.value })
                }
                className="border w-full p-2 rounded"
              />

              <button
                type="submit"
                className="bg-green-500 text-white w-full py-2 rounded"
              >
                Save
              </button>
            </form>

            <button
              onClick={() => setShowModal(false)}
              className="mt-3 text-red-500 w-full"
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