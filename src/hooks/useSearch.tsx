import Endpoints from "@/api/endpoints";
import { Hit } from "@/types/searchRes.type";
import { useReducer, useRef, useEffect } from "react";

type State = {
    data: Hit[] | undefined;
    loading: boolean;
    error: string | null;
    moreData: boolean;
};

type Action =
    | { type: "LOAD"; payload: Hit[] }
    | { type: "ERROR"; payload: string }
    | {type: "FINISHEDDATA"}
    | { type: "LOADING" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "LOAD":
            return { ...state, loading: false, data: action.payload };
        case "ERROR":
            return { ...state, loading: false, error: action.payload };
        case "LOADING":
            return { ...state, loading: true };
        case "FINISHEDDATA":
            return {...state, loading: false, moreData: false}
        default:
            return state;
    }
}

const useSearch = (initialPage: number, search: string, category: string) => {
    const [state, dispatch] = useReducer(reducer, {
        data: undefined,
        loading: true,
        error: null,
        moreData: true,
    });

    const { data, loading, error, moreData } = state;
    const pageRef = useRef(initialPage);

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "LOADING" });
            try {
                const res = await Endpoints.search({
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
            const res = await Endpoints.search({
                page: pageRef.current,
                query: search,
                category,
            });
            if (res.hits.length=== 0) {
                dispatch({type:"FINISHEDDATA"})
            }
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

    return { moreData, data, loading, error, fetchMoreData, resetPage };
};

export default useSearch;
