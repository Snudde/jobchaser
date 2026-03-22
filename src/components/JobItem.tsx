import {
  ReceiptText,
  MapPin,
  UserRoundCog,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import type { Job } from "../types/job";
import { useAuthStore } from "../store/authStore";

const API = "http://localhost:3000";

const statusLabels: Record<string, string> = {
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  rejected: "Rejected",
};

export default function JobItem(props: Job) {
  const { isAuthenticated: isLoggedIn, token } = useAuthStore();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("applied");

  async function handleSave() {
    setSaving(true);

    await fetch(`${API}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: props.employer.name,
        headline: props.headline,
        location: props.workplace_address?.municipality ?? null,
        deadline: props.application_deadline,
        url: props.webpage_url,
        status: selectedStatus,
        source: "api",
      }),
    });

    setSaving(false);
    setSaved(true);
  }

  return (
    <article className="p-4 border border-gray-200 rounded-lg shadow-md bg-zinc-900">
      <p className="flex items-center justify-end text-xs mb-5 border border-green-500 rounded-lg w-fit ml-auto p-2">
        Posted: {new Date(props.publication_date).toLocaleDateString("en-US")}
      </p>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl">{props.employer.name}</h2>
      </div>

      <h3 className="text-xl font-bold mb-1 text-green-500">
        {props.headline}
      </h3>

      <div className="flex items-center justify-between mt-3">
        <p className="flex items-center gap-1">
          <ReceiptText size={16} />{" "}
          {props.employment_type?.label ?? "Not specified"}
        </p>
        <p className="flex items-center gap-1">
          <MapPin size={16} />{" "}
          {props.workplace_address?.municipality ?? "Not specified"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="flex items-center gap-1">
          <UserRoundCog size={16} /> {props.occupation?.label ?? "Not specified"}
        </p>
        <p className="flex items-center gap-1">
          <Calendar size={16} /> Deadline:{" "}
          {new Date(props.application_deadline).toLocaleDateString("en-US")}
        </p>
      </div>

      {props.webpage_url && (
        <a
          href={props.webpage_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 mt-4 text-green-500 hover:underline text-sm"
        >
          <ExternalLink size={14} /> Apply here
        </a>
      )}

      {isLoggedIn && (
        <div className="mt-4 flex items-center gap-2">
          {saved ? (
            <span className="text-sm text-green-500">Saved!</span>
          ) : (
            <>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm bg-zinc-800 border border-gray-600 rounded p-1"
              >
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <button
                onClick={handleSave}
                disabled={saving}
                className="text-sm border border-green-500 text-green-500 rounded px-2 py-1 hover:bg-green-500 hover:text-black"
              >
                {saving ? "Saving..." : "Save job"}
              </button>
            </>
          )}
        </div>
      )}
    </article>
  );
}
