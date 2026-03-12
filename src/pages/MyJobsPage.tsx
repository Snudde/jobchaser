import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API = "http://localhost:3000";

interface Job {
  id: number;
  company: string;
  headline: string;
  location: string | null;
  deadline: string | null;
  url: string | null;
  status: string | null;
}

const statusLabels: Record<string, string> = {
  applied: "Ansökt",
  interview: "Intervju",
  offer: "Erbjudande",
  rejected: "Avslag",
};

export default function MyJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  async function handleDelete(id: number) {
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setJobs((prev) => prev.filter((job) => job.id !== id));
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/jobs/mine?source=api`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
      })
      .catch(() => toast.error("Kunde inte hämta jobb"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (jobs.length === 0) return <p>Inga sparade jobb</p>;

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Sparade jobb</h1>

      <ul className="w-full flex flex-wrap gap-4">
        {jobs.map((job) => (
          <li key={job.id} className="w-full md:w-[calc(50%-0.5rem)]">
            <article className="p-4 border border-gray-200 rounded-lg shadow-md bg-zinc-900">
              <h2 className="text-xl mb-1">{job.company}</h2>
              <h3 className="text-xl font-bold text-green-500 mb-3">{job.headline}</h3>
              {job.location && <p className="text-sm text-gray-400 mb-1">{job.location}</p>}
              {job.deadline && (
                <p className="text-sm text-gray-400 mb-1">
                  Sista ansökan: {new Date(job.deadline).toLocaleDateString("sv-SE")}
                </p>
              )}
              {job.status && (
                <p className="text-sm mb-3">
                  Status: <span className="text-green-500">{statusLabels[job.status] ?? job.status}</span>
                </p>
              )}
              <div className="flex items-center gap-3 mt-4">
                {job.url && (
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-500 hover:underline"
                  >
                    Annons
                  </a>
                )}
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-sm border border-red-500 text-red-500 rounded px-2 py-1 hover:bg-red-500 hover:text-black"
                >
                  Ta bort
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
