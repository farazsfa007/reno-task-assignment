import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

interface NoticeFormData {
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
}

export default function NoticeForm() {
  const router = useRouter();
  const { id } = router.query;

  const isEdit =
    typeof id === "string" &&
    id !== "new";

  const [form, setForm] =
    useState<NoticeFormData>({
      title: "",
      body: "",
      category: "General",
      priority: "Normal",
      publishDate: "",
    });

  useEffect(() => {
    if (isEdit && id) {
      fetch(`/api/notices/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setForm({
            title: data.title,
            body: data.body,
            category: data.category,
            priority: data.priority,
            publishDate:
              data.publishDate.split("T")[0],
          })
        );
    }
  }, [id, isEdit]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const method = isEdit
      ? "PUT"
      : "POST";

    const url = isEdit
      ? `/api/notices/${id}`
      : "/api/notices";

    await fetch(url, {
      method,
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    router.push("/");
  };

  return (
    <div className="formContainer">
      <h1 className="formTitle">
        {isEdit
          ? "Edit Notice"
          : "Add Notice"}
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
          className="input"
          required
        />

        <textarea
          placeholder="Body"
          value={form.body}
          onChange={(e) =>
            setForm({
              ...form,
              body: e.target.value,
            })
          }
          className="textarea"
          required
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
          className="select"
        >
          <option value="Exam">
            Exam
          </option>
          <option value="Event">
            Event
          </option>
          <option value="General">
            General
          </option>
        </select>

        <select
          value={form.priority}
          onChange={(e) =>
            setForm({
              ...form,
              priority: e.target.value,
            })
          }
          className="select"
        >
          <option value="Normal">
            Normal
          </option>
          <option value="Urgent">
            Urgent
          </option>
        </select>

        <input
          type="date"
          value={form.publishDate}
          onChange={(e) =>
            setForm({
              ...form,
              publishDate:
                e.target.value,
            })
          }
          className="input"
          required
        />

        <button
          type="submit"
          className="submitBtn"
        >
          Save Notice
        </button>
      </form>
    </div>
  );
}