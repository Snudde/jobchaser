import { useEffect, useState } from "react";
import JobItem from "./JobItem";
import SearchBar from "./SearchBar";
import type { Job } from "../types/job";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(searchTerm)}&limit=20`,
        );
        if (!response.ok) {
          throw new Error("Något gick fel");
        }
        const data = await response.json();
        setJobs(data.hits);
      } catch (error) {
        setError("Fel: Kunde inte hämta jobb");
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      getJobs();
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <section className="job-list">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {loading && <p>Laddar jobb...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && jobs.length === 0 && searchTerm && (
        <p>Inga jobb matchade din sökning. Prova ett annat sökord.</p>
      )}

      <ul className="w-full flex flex-wrap gap-4">
        {!loading &&
          !error &&
          jobs.map((job) => (
            <li key={job.id} className="w-full md:w-[calc(50%-0.5rem)]">
              <JobItem {...job} />
            </li>
          ))}
      </ul>
    </section>
  );
}
