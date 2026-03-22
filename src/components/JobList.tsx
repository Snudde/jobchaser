import { useEffect, useState } from "react";
import JobItem from "./JobItem";
import FilterPanel from "./FilterPanel";
import type { Job } from "../types/job";
import { useFilterStore } from "../store/filterStore";

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { textFilter, location, category, employmentType } = useFilterStore();

  useEffect(() => {
    async function getJobs() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(textFilter)}&limit=50`,
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        setJobs(data.hits);
      } catch {
        setError("Error: Could not fetch jobs");
      } finally {
        setLoading(false);
      }
    }

    const timeout = setTimeout(() => {
      getJobs();
    }, 400);

    return () => clearTimeout(timeout);
  }, [textFilter]);

  const filteredJobs = jobs.filter((job) => {
    const matchLocation =
      !location ||
      job.workplace_address?.municipality
        ?.toLowerCase()
        .includes(location.toLowerCase());

    const matchCategory =
      !category ||
      job.occupation?.label?.toLowerCase().includes(category.toLowerCase());

    const matchEmploymentType =
      !employmentType ||
      job.employment_type?.label
        ?.toLowerCase()
        .includes(employmentType.toLowerCase());

    return matchLocation && matchCategory && matchEmploymentType;
  });

  return (
    <section className="job-list">
      <FilterPanel />

      {loading && <p>Loading jobs...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && filteredJobs.length === 0 && (
        <p>No jobs matched the filters. Try adjusting your search.</p>
      )}

      <ul className="w-full flex flex-wrap gap-4">
        {!loading &&
          !error &&
          filteredJobs.map((job) => (
            <li key={job.id} className="w-full md:w-[calc(50%-0.5rem)]">
              <JobItem {...job} />
            </li>
          ))}
      </ul>
    </section>
  );
}
