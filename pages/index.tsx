import Link from "next/link";
import { useEffect, useState } from "react";

interface Notice {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
}

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);

  const fetchNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Delete this notice?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    fetchNotices();
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Notice Board</h1>

        <Link
          href="/notice/new"
          className="addBtn"
        >
          Add Notice
        </Link>
      </div>

      <div className="noticeGrid">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="noticeCard"
          >
            <div className="cardHeader">
              <h2 className="noticeTitle">
                {notice.title}
              </h2>

              {notice.priority === "Urgent" && (
                <span className="urgentBadge">
                  Urgent
                </span>
              )}
            </div>

            <p className="noticeBody">
              {notice.body}
            </p>

            <p className="noticeCategory">
              {notice.category}
            </p>

            <div className="actions">
              <Link
                href={`/notice/${notice.id}`}
                className="editBtn"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  handleDelete(notice.id)
                }
                className="deleteBtn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}