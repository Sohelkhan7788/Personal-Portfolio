const handleAdd = async (e) => {
  e.preventDefault();

  if (!form.title.trim()) {
    return toast.error("Title required");
  }

  try {
    await api.post("/certifications", {
      title: form.title.trim(),
      issuer: form.issuer,
      link: form.link,
    });

    toast.success("Added");
    setShowModal(false);
    setForm({ title: "", issuer: "", link: "" });
    fetchCerts();
  } catch (err) {
    console.error(err?.response?.data);
    toast.error(err?.response?.data?.message || "Failed");
  }
};