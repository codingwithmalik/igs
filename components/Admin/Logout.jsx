"use client";
import { toast } from "react-toastify";
import React from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Logout successful");
        // Redirect to login page or perform other actions
        router.push("/admin/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Error during logout: " + error.message);
    }
  };
  return (
    <div>
      <div className="logout">
        <button
          className="logout-btn p-2 bg-amber-500 text-white m-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
