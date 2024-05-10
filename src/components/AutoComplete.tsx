import React, { useState, useMemo } from "react";
import { Option } from "../interfaces/IOption";
import { Props } from "../types/Props.type";
import '../assets/autocomplete.css'
  
const AutoComplete: React.FC<Props> = ({ placeholder }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Option[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Consume API and set results state
    const fetchData = async () => {
      try {
        const url = `http://localhost:3001/api/character`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const results = data.results as Option[];
        
        setResults(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    // Handle input change, call API function and handle state that controls if the character list is visible or not
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      if (value.length > 0) {
        fetchData();
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Handles click, set full character name to the query state and hide character list
    const handleOptionClick = (text: string) => {
      setQuery(text);
      setIsOpen(false);
    };
  
    const renderOption = (option: Option) => {
      const loweredQuery = query.toLowerCase();
      const parts = option.name.split(new RegExp(query, "gi"));
      return (
        <li className="complete" key={option.id} onClick={() => handleOptionClick(option.name)}>
          {parts.map((part, index) => (
            <span key={index}>
              {index > 0 && loweredQuery.length > 0 && <span className="highlight">{loweredQuery}</span>}
              {part}
            </span>
          ))}
        </li>
      );
    };

    // Memoize filtered options based on query and results
    const filteredOptions = useMemo(() => {
      if (!query || query.length === 0) return [];

      return results.filter((option) =>
        option.name.toLowerCase().includes(query.toLowerCase())
      );
    }, [query, results]);
  
    return (
      <div className="autocomplete">
        <label htmlFor="search">Search for Rick and Morty characters</label>
        <input
          id="search"
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="options">
            {filteredOptions.map(renderOption)}
          </ul>
        )}
      </div>
    );
};
  
  
export default AutoComplete;
  