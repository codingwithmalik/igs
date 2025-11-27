"use client";
import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { signIn, signOut } from "next-auth/react";

const AdminLoginPage = () => {
  const { t } = useTranslation("admin/login");
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const result = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/admin",
    });
    alert(result);
    if (result?.ok) {
      window.location.href = "/admin"; // redirect after successful login
    } else {
      alert(result?.error);
    }
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
