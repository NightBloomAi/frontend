import { searchEndpoint } from "@/api/nightbloomApi";
import { Hit } from "@/types/searchRes.type";
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

const useSearch = (initialPage: number, search: string, category: string) => {
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
                const res = await searchEndpoint({
                    page: pageRef.current,
                    query: search,
                    category,
                });
                dispatch({ type: "LOAD", payload: res.hits });
            } catch (error: any) {
                dispatch({ type: "ERROR", payload: error.message });
            }
        };
        fetchData();
    }, [search, category]);

    const fetchMoreData = async () => {
        pageRef.current++;
        try {
            const res = await searchEndpoint({
                page: pageRef.current,
                query: search,
                category,
            });
            if (data) {
                dispatch({ type: "LOAD", payload: data.concat(res.hits) });
            }
        } catch (error: any) {
            dispatch({ type: "ERROR", payload: error.message });
        }
    };

    const resetPage = () => {
        pageRef.current = 1;
    };

    return { data, loading, error, fetchMoreData, resetPage };
};

export default useSearch;
