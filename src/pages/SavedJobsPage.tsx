import { useState, useEffect } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";

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
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
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
      .catch(() => toast.error("Could not fetch saved jobs"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (jobs.length === 0) return <p>No saved jobs</p>;

  return (
    <div>
      <h1>Saved jobs</h1>

      {jobs.map((job) => (
        <div key={job.id} style={{ marginBottom: "20px" }}>
          <h2>{job.headline}</h2>
          <p>{job.company}{job.location ? ` — ${job.location}` : ""}</p>
          {job.deadline && (
            <p>Deadline: {new Date(job.deadline).toLocaleDateString("en-US")}</p>
          )}
          {job.url && (
            <a href={job.url} target="_blank" rel="noopener noreferrer">Listing</a>
          )}
          {job.status && (
            <p>Status: {statusLabels[job.status] ?? job.status}</p>
          )}
          <Link to={`/jobs/${job.id}/edit`}>Edit</Link>
          <br />
          <button onClick={() => handleDelete(job.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
