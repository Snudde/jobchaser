import { useState, useEffect } from "react";
import { Link } from "react-router";

const API = "http://localhost:3000";

interface SavedJob {
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

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);
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
    fetch(`${API}/jobs?source=api`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setJobs(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Laddar...</p>;
  if (jobs.length === 0) return <p>Inga sparade jobb</p>;

  return (
    <div>
      <h1>Sparade jobb</h1>

      {jobs.map((job) => (
        <div key={job.id} style={{ marginBottom: "20px" }}>
          <h2>{job.headline}</h2>
          <p>{job.company}{job.location ? ` — ${job.location}` : ""}</p>
          {job.deadline && (
            <p>Sista ansökan: {new Date(job.deadline).toLocaleDateString("sv-SE")}</p>
          )}
          {job.url && (
            <a href={job.url} target="_blank" rel="noopener noreferrer">Annons</a>
          )}
          {job.status && (
            <p>Status: {statusLabels[job.status] ?? job.status}</p>
          )}
          <Link to={`/jobs/${job.id}/edit`}>Redigera</Link>
          <br />
          <button onClick={() => handleDelete(job.id)}>Ta bort</button>
        </div>
      ))}
    </div>
  );
}
