"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Eye, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { markRead, deleteMessage } from "@/app/store/slices/messageSlice";

export default function AdminInbox() {
  const { t } = useTranslation("admin/home");

  const messages = useSelector((state) => state.messages.messages);
  console.log(messages);
  const dispatch = useDispatch();
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all"); // new filter state
  const listRef = useRef(null);
  const contentRefs = useRef({});

  // Animate list items
  useEffect(() => {
    if (!listRef.current) return;

    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, []);

  // Animate expand content
  useEffect(() => {
    if (!expandedId) return;
    const el = contentRefs.current[expandedId];
    if (!el) return;

    gsap.fromTo(
      el,
      { height: 0, opacity: 0 },
      {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      }
    );
  }, [expandedId]);

  // Filter messages based on read/unread/all
  const filteredMessages = messages.filter((msg) => {
    if (filter === "all") return true;
    if (filter === "read") return msg.read;
    if (filter === "unread") return !msg.read;
  });

  return (
    <div className="px-2 sm:px-4 lg:px-0 min-h-screen text-gray-100">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
          {t("inbox.title")}
        </h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              filter === "all"
                ? "bg-emerald-500 text-black"
                : "bg-[#0f1415] text-gray-300 border border-[#1f2a2d]"
            }`}
          >
            {t("inbox.all")}
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              filter === "read"
                ? "bg-emerald-500 text-black"
                : "bg-[#0f1415] text-gray-300 border border-[#1f2a2d]"
            }`}
          >
            {t("inbox.read")}
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              filter === "unread"
                ? "bg-emerald-500 text-black"
                : "bg-[#0f1415] text-gray-300 border border-[#1f2a2d]"
            }`}
          >
            {t("inbox.unread")}
          </button>
        </div>

        {filteredMessages.length > 0 ? (
          <div className="bg-[#0f1415] rounded-xl border border-[#1f2a2d] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="p-4 border-b border-[#1f2a2d] text-sm font-medium text-gray-300">
              {t("inbox.messages")}
            </div>

            <ul ref={listRef} className="divide-y divide-[#1f2a2d]">
              {filteredMessages.map((msg) => (
                <li
                  key={msg.id}
                  className={`p-4 transition hover:bg-white/5 ${
                    expandedId === msg.id ? "bg-white/5" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-white">
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        )}
                      </div>

                      <p className="text-sm text-gray-400 truncate">
                        {msg.subject}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">{msg.date}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setExpandedId(expandedId === msg.id ? null : msg.id);
                          dispatch(markRead(msg.id));
                        }}
                        className="p-2 rounded-lg text-emerald-300 hover:bg-emerald-500/10"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => dispatch(deleteMessage(msg.id))}
                        className="p-2 rounded-lg text-rose-300 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {expandedId === msg.id && (
                    <div
                      ref={(el) => (contentRefs.current[msg.id] = el)}
                      className="mt-3 pt-3 border-t border-[#1f2a2d] overflow-hidden"
                    >
                      <div className="space-y-2">
                        {/* Email */}
                        <p className="text-xs text-gray-400">
                          <span className="text-gray-500">
                            {t("inbox.email")}:
                          </span>{" "}
                          <a
                            href={`mailto:${msg.email}`}
                            className="text-emerald-300 hover:underline"
                          >
                            {msg.email}
                          </a>
                        </p>

                        {/* Read/Unread badge */}
                        <span
                          className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                            msg.read
                              ? "bg-emerald-500/10 text-emerald-300"
                              : "bg-yellow-500/10 text-yellow-300"
                          }`}
                        >
                          {msg.read ? t("inbox.read") : t("inbox.unread")}
                        </span>

                        {/* Message */}
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-gray-500 text-sm">{t("inbox.noMessages")}</div>
        )}
      </div>
    </div>
  );
}
