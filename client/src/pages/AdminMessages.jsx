import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMail, HiMailOpen, HiTrash, HiRefresh } from "react-icons/hi";
import toast from "react-hot-toast";
import api from "../api"; // ✅ correct import

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // ==============================
  // 🔥 FETCH MESSAGES
  // ==============================
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get("/contact/admin/all");

      if (Array.isArray(res.data)) {
        setMessages(res.data);
      } else if (Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      } else if (Array.isArray(res.data.messages)) {
        setMessages(res.data.messages);
      } else {
        setMessages([]);
      }
    } catch (err) {
      toast.error("Failed to load messages");
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ==============================
  // 🔥 MARK READ
  // ==============================
  const markRead = async (id) => {
    try {
      await api.put(`/contact/admin/${id}/read`);
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: true } : m))
      );
    } catch {}
  };

  // ==============================
  // 🔥 DELETE
  // ==============================
  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;

    try {
      await api.delete(`/contact/admin/${id}`);
      toast.success("Deleted!");
      setSelected(null);
      fetchMessages();
    } catch {
      toast.error("Failed to delete");
    }
  };

  // ==============================
  const openMessage = (msg) => {
    setSelected(msg);
    if (!msg.read) markRead(msg._id);
  };

  const unread = messages.filter((m) => !m.read).length;

  // ==============================
  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black dark:text-white">Messages</h2>
          <p className="text-gray-500 text-sm mt-1 dark:text-gray-400">
            {unread > 0 ? (
              <span className="text-primary font-semibold">
                {unread} unread
              </span>
            ) : (
              "All read"
            )}{" "}
            · {messages.length} total
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition"
        >
          <HiRefresh size={20} />
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {messages.length > 0 ? (
            messages.map((msg, i) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => openMessage(msg)}
                className={`bg-white dark:bg-[#1e2a4a] rounded-2xl p-5 border cursor-pointer transition-all hover:shadow-md ${
                  !msg.read
                    ? "border-primary/40 bg-primary/5"
                    : "border-gray-100 dark:border-gray-800"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      !msg.read
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {!msg.read ? (
                      <HiMail size={20} />
                    ) : (
                      <HiMailOpen size={20} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-bold text-sm dark:text-white">
                        {msg.name}
                      </span>
                      <span className="text-xs text-gray-400">
                        {msg.createdAt
                          ? new Date(msg.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">{msg.email}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(msg._id);
                    }}
                    className="p-2 bg-red-50 text-red-500 rounded-lg"
                  >
                    <HiTrash size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              <HiMail size={48} className="mx-auto mb-3 opacity-30" />
              <p>No messages yet</p>
            </div>
          )}
        </div>
      )}

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-[#1e2a4a] p-6 rounded-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg">{selected.name}</h3>
            <p className="text-sm text-gray-500">{selected.email}</p>

            <p className="mt-4">{selected.message}</p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => handleDelete(selected._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>

              <button
                onClick={() => setSelected(null)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMessages;