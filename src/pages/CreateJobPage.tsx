import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";

type FormData = {
  company: string;
  headline: string;
  location: string;
  deadline: string;
  url: string;
};

const API = "http://localhost:3000";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(formData: FormData) {
    const res = await fetch(`${API}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...formData, source: "manual" }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("root", { message: data.error ?? "Something went wrong" });
      return;
    }

    navigate("/my-listings");
  }

  const inputClass = "w-full bg-zinc-800 border border-gray-600 rounded p-2 mt-1 focus:outline-none focus:border-green-500";
  const labelClass = "text-sm text-gray-400";

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Create listing</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input id="company" className={inputClass} {...register("company", { required: "Company is required" })} />
          {errors.company && <p role="alert" className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
        </div>

        <div>
          <label htmlFor="headline" className={labelClass}>Job title</label>
          <input id="headline" className={inputClass} {...register("headline", { required: "Job title is required" })} />
          {errors.headline && <p role="alert" className="text-red-500 text-sm mt-1">{errors.headline.message}</p>}
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>Location</label>
          <input id="location" className={inputClass} {...register("location")} />
        </div>

        <div>
          <label htmlFor="deadline" className={labelClass}>Application deadline</label>
          <input id="deadline" type="date" className={inputClass} {...register("deadline")} />
        </div>

        <div>
          <label htmlFor="url" className={labelClass}>Link to listing</label>
          <input id="url" type="url" className={inputClass} {...register("url")} />
        </div>

        {errors.root && <p role="alert" className="text-red-500 text-sm">{errors.root.message}</p>}

        <button
          type="submit"
          className="mt-2 border border-green-500 text-green-500 rounded px-4 py-2 hover:bg-green-500 hover:text-black w-fit"
        >
          Create job
        </button>
      </form>
    </div>
  );
}
