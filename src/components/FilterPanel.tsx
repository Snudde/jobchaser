import { useFilterStore } from "../store/filterStore";

export default function FilterPanel() {
  const { textFilter, location, category, employmentType, dispatch } =
    useFilterStore();

  const activeCount = [textFilter, location, category, employmentType].filter(
    Boolean
  ).length;

  const inputClass =
    "w-full bg-zinc-800 border border-gray-600 rounded p-2 focus:outline-none focus:border-green-500 text-sm";

  return (
    <div className="mb-4 p-4 border border-gray-700 rounded-lg bg-zinc-900">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-gray-400">
          Filter {activeCount > 0 && (
            <span className="ml-1 bg-green-500 text-black text-xs rounded-full px-1.5 py-0.5">
              {activeCount}
            </span>
          )}
        </h3>
        {activeCount > 0 && (
          <button
            onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
            className="text-xs text-red-400 hover:text-red-300"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <input
          type="text"
          value={textFilter}
          onChange={(e) =>
            dispatch({ type: "SET_TEXT_FILTER", payload: e.target.value })
          }
          placeholder="Search..."
          className={inputClass}
        />
        <input
          type="text"
          value={location}
          onChange={(e) =>
            dispatch({ type: "SET_LOCATION", payload: e.target.value })
          }
          placeholder="Location (e.g. Stockholm)"
          className={inputClass}
        />
        <input
          type="text"
          value={category}
          onChange={(e) =>
            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
          }
          placeholder="Category (e.g. Developer)"
          className={inputClass}
        />
        <input
          type="text"
          value={employmentType}
          onChange={(e) =>
            dispatch({ type: "SET_EMPLOYMENT_TYPE", payload: e.target.value })
          }
          placeholder="Employment type (e.g. Full-time)"
          className={inputClass}
        />
      </div>
    </div>
  );
}
