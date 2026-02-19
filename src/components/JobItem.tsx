import {
  ReceiptText,
  MapPin,
  UserRoundCog,
  Calendar,
  ExternalLink,
} from "lucide-react";
import type { Job } from "../types/job";

export default function JobItem(props: Job) {
  return (
    <article className="p-4 border border-gray-200 rounded-lg shadow-md bg-zinc-900">
      <p className="flex items-center justify-end text-xs mb-5 border border-green-500 rounded-lg w-fit ml-auto p-2">
        Posted: {new Date(props.publication_date).toLocaleDateString("sv-SE")}
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
          {props.employment_type?.label ?? "Ej angivet"}
        </p>
        <p className="flex items-center gap-1">
          <MapPin size={16} />{" "}
          {props.workplace_address?.municipality ?? "Ej angivet"}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="flex items-center gap-1">
          <UserRoundCog size={16} /> {props.occupation?.label ?? "Ej angivet"}
        </p>
        <p className="flex items-center gap-1">
          <Calendar size={16} /> Sista ansökan:{" "}
          {new Date(props.application_deadline).toLocaleDateString("sv-SE")}
        </p>
      </div>

      {props.webpage_url && (
        <a
          href={props.webpage_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 mt-4 text-green-500 hover:underline text-sm"
        >
          <ExternalLink size={14} /> Ansök här
        </a>
      )}
    </article>
  );
}
