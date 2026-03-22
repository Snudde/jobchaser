import { create } from "zustand";


interface FilterState {
  textFilter: string;
  location: string;
  category: string;
  employmentType: string;
}

export type FilterAction =
  | { type: "SET_TEXT_FILTER"; payload: string }
  | { type: "SET_LOCATION"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_EMPLOYMENT_TYPE"; payload: string }
  | { type: "CLEAR_FILTERS" };

const initialFilterState: FilterState = {
  textFilter: "",
  location: "",
  category: "",
  employmentType: "",
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return { ...state, textFilter: action.payload };
    case "SET_LOCATION":
      return { ...state, location: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_EMPLOYMENT_TYPE":
      return { ...state, employmentType: action.payload };
    case "CLEAR_FILTERS":
      return initialFilterState;
    default:
      return state;
  }
}

interface FilterStore extends FilterState {
  dispatch: (action: FilterAction) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialFilterState,
  dispatch: (action) => set((state) => filterReducer(state, action)),
}));
