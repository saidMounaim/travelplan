"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CityAutocompleteProps {
  query: string;
  setQuery: (query: string) => void;
}

const CityAutocomplete = ({ query, setQuery }: CityAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data?.items) {
        setSuggestions(data.items);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setLoading(false);
  };

  const debouncedFetch = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetch(query);
  }, [query]);

  const handleSelect = (suggestion: any) => {
    setQuery(suggestion.title);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full">
      <Popover>
        <PopoverTrigger className="w-full">
          <Input
            placeholder="Search for a location"
            name="destination"
            className="border-orange-200 focus:ring-orange-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </PopoverTrigger>
        {suggestions && (
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-orange-200 focus:ring-orange-500">
            <div className="max-h-60 overflow-y-auto">
              {loading && <p className="w-full p-3">Loading...</p>}
              {!loading && suggestions.length === 0 && query && (
                <p className="p-3">No results found</p>
              )}
              {!loading &&
                suggestions.map((item: any) => (
                  <div
                    key={item.id}
                    className="w-full p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelect(item)}
                  >
                    {item.title}
                  </div>
                ))}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

export default CityAutocomplete;
