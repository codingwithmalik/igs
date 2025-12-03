"use client";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  const { t } = useTranslation("admin/login");
  const [error, setError] = useState("");
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Login successful: " + data.message);
        // Redirect to admin dashboard or perform other actions
        window.location.href = "/admin";
      } else {
        let error = data.message || "Wrong credentials";
        setError(error);
        toast.error("Login failed: " + error);
      }
    } catch (error) {
      toast.error("Error during login: " + error.message);
    }
    setform({ email: "", password: "" });
  };
  return (
    <section className="md:min-h-[calc(100vh-64px)] min-h-[calc(90vh-64px)] flex items-center justify-center px-4 py-12 gradient">
      <div className="w-full max-w-md rounded-2xl glass-bg px-8 py-8 shadow-2xl border border-white/10">
        <header className="mb-8 text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-green-300">
            {t("tagline")}
          </p>
          <h1 className="text-3xl font-semibold">{t("title")}</h1>
          <p className="text-sm text-white/80">{t("description")}</p>
        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-white/90"
            >
              {t("emailLabel")}
            </label>
            <input
              value={form.email}
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-green-400/40 transition"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/90"
            >
              {t("passwordLabel")}
            </label>
            <input
              value={form.password}
              onChange={handleChange}
              id="password"
              name="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 transition"
            />
          </div>
          <div className="error">
            {/* Display error messages here if needed */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-green-400/90 px-4 py-3 font-semibold text-emerald-950 transition hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLoginPage;
