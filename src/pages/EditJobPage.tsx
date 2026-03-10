import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

type FormData = {
  company: string;
  headline: string;
  location: string;
  deadline: string;
  url: string;
  status: string;
};

const API = "http://localhost:3000";

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    async function fetchJob() {
      const res = await fetch(`${API}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        reset({
          company: data.company,
          headline: data.headline,
          location: data.location ?? "",
          deadline: data.deadline ?? "",
          url: data.url ?? "",
          status: data.status,
        });
      }
    }
    fetchJob();
  }, [id]);

  async function onSubmit(formData: FormData) {
    const res = await fetch(`${API}/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("root", { message: data.error ?? "Något gick fel." });
      return;
    }

    navigate(-1);
  }

  const inputClass = "w-full bg-zinc-800 border border-gray-600 rounded p-2 mt-1 focus:outline-none focus:border-green-500";
  const labelClass = "text-sm text-gray-400";

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Redigera jobb</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="company" className={labelClass}>Företag</label>
          <input id="company" className={inputClass} {...register("company", { required: "Företag krävs" })} />
          {errors.company && <p role="alert" className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <label htmlFor="headline" className={labelClass}>Jobbtitel</label>
          <input id="headline" className={inputClass} {...register("headline", { required: "Jobbtitel krävs" })} />
          {errors.headline && <p role="alert" className="text-red-500 text-sm mt-1">{errors.headline.message}</p>}
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>Ort</label>
          <input id="location" className={inputClass} {...register("location")} />
        </div>

        <div>
          <label htmlFor="deadline" className={labelClass}>Sista ansökningsdag</label>
          <input id="deadline" type="date" className={inputClass} {...register("deadline")} />
        </div>

        <div>
          <label htmlFor="url" className={labelClass}>Länk till annons</label>
          <input id="url" type="url" className={inputClass} {...register("url")} />
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>Status</label>
          <select id="status" className={inputClass} {...register("status", { required: "Status krävs" })}>
            <option value="">Välj status</option>
            <option value="applied">Ansökt</option>
            <option value="interview">Intervju</option>
            <option value="offer">Erbjudande</option>
            <option value="rejected">Avslag</option>
          </select>
          {errors.status && <p role="alert" className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
        </div>

        {errors.root && <p role="alert" className="text-red-500 text-sm">{errors.root.message}</p>}

        <button
          type="submit"
          className="mt-2 border border-green-500 text-green-500 rounded px-4 py-2 hover:bg-green-500 hover:text-black w-fit"
        >
          Spara ändringar
        </button>
      </form>
    </div>
  );
}
