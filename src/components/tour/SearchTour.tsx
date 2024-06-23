"use client";
import { Dispatch, useState } from "react";

function TourSearch({
  searchTours,
  setTours,
  toursValues,
}: {
  searchTours: (query: string) => Promise<any>;
  setTours: Dispatch<any>;
  toursValues: any;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      try {
        const results = await searchTours(searchQuery);
        console.log("search result results::: ", results);

        setTours(results);
      } catch (error) {
        console.error("Error searching tours:", error);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setTours(toursValues);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="w-full flex bg-white opacity-90  rounded-lg shadow-md p-2 px-5 gap-2">
        <div className="w-72">
          <label
            htmlFor="default-search"
            className="text-sm  text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          {/* <div className="absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none"></div> */}
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-100 "
            placeholder="Where's tour next adventure?"
            required
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-ghost btn-circle bg-orange-400 text-white"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default TourSearch;
