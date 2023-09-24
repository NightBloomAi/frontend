import { useDebounce } from "@/hooks/useDebounce";
import { useState, useRef, useEffect } from "react";
import { SearchIcon } from "../assets/icons";

function SearchBar({
    onSearch,
    onSearchChange,
    initialSearch,
}: {
    onSearch: (search: string) => void;
    onSearchChange: () => void;
    initialSearch?: string;
}): JSX.Element {
    const [search, setSearch] = useState(initialSearch ?? "");
    const debouncedSearch = useDebounce(search, 500);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "/") {
                event.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange();
        setSearch(event.target.value);
    };

    return (
        <div className="relative mt-4">
            <SearchIcon />
            <input
                ref={searchRef}
                type="text"
                placeholder="Type to search"
                value={search}
                onChange={handleSearchChange}
                className="w-full py-3 pl-12 pr-40 text-[var(--pink)] rounded-full outline-none bg-[var(--trans-grey)] focus:rounded-full focus:outline-none border-2 border-transparent"
            />
        </div>
    );
}

export default SearchBar;
