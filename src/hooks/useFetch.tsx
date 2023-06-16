import initialResponse from "@/data/fake.data";
import { SearchRes } from "@/types/searchRes.type";
import { useState, useEffect } from "react";

/**
Custom hook for making an HTTP request to the specified URL and handling the response.
@param {string} url - The URL to fetch the data from.
@returns {object} An object containing the data, loading state, and error state.
*/
function useFetch(url: string) {
  const [data, setData] = useState<SearchRes | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  // For testing purposes
  // useEffect(() => {
  //   setData(initialResponse);
  //   console.log(initialResponse);
  //   setLoading(false);
  // }, []);

  return { data, loading, error };
}

export default useFetch;
