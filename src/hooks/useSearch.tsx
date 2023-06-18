import { searchEndpoint } from "@/config/endpoints";
import { Hit, SearchRes } from "@/types/searchRes.type";
import { useReducer, useRef, useEffect } from "react";

type State = {
  data: Hit[] | undefined;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "LOAD"; payload: Hit[] }
  | { type: "ERROR"; payload: string }
  | { type: "LOADING" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
}

const useSearch = (initialPage: number, search: string) => {
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    loading: true,
    error: null,
  });

  const { data, loading, error } = state;
  const pageRef = useRef(initialPage);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(searchEndpoint(pageRef.current, search));
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const resData = await res.json();
        dispatch({ type: "LOAD", payload: resData.hits });
      } catch (error: any) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    };
    fetchData();
  }, [search]);

  const fetchMoreData = async () => {
    pageRef.current++;
    const res = await fetch(searchEndpoint(pageRef.current, search));
    const searchRes: SearchRes = await res.json();
    if (data) {
      dispatch({ type: "LOAD", payload: data.concat(searchRes.hits) });
    }
  };

  const resetPage = () => {
    pageRef.current = 1;
  };

  return { data, loading, error, fetchMoreData, resetPage };
};

export default useSearch;
