import React, { useState, useEffect, useRef } from 'react';
import "../../styles/auto-search.css";
export default function SearchAsyncCombobox({
    fetchOptions,
    onSelect,
    getDisplayValue,
    getKey,
    placeholder = 'Search...',
    debounceTime = 300,
    noResultsMessage = 'No results found.',
}) {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const wrapperRef = useRef(null);
    const debouncedQuery = useDebounce(query, debounceTime);

    // Handle outside click to close dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch data when debounced query changes
    useEffect(() => {
        let isMounted = true;

        const loadOptions = async () => {
            if (!debouncedQuery.trim()) {
                setOptions([]);
                setIsOpen(false);
                return;
            }

            setIsLoading(true);
            try {
                const results = await fetchOptions(debouncedQuery);
                if (isMounted) {
                    setOptions(results);
                    setIsOpen(true);
                }
            } catch (error) {
                console.error('Failed to fetch options:', error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadOptions();

        return () => {
            isMounted = false; // Cleanup prevents state updates if component unmounts
        };
    }, [debouncedQuery, fetchOptions]);

    const handleSelect = (item) => {
        setQuery(getDisplayValue(item));
        onSelect(item);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="combobox-wrapper">
            <input
                type="text"
                className="combobox-input"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    if (!isOpen && e.target.value) setIsOpen(true);
                }}
                onFocus={() => {
                    if (options.length > 0) setIsOpen(true);
                }}
            />

            {/* Loading Spinner Indicator */}
            {isLoading && (
                <div className="combobox-spinner-wrapper">
                    <div className="combobox-spinner"></div>
                </div>
            )}

            {/* Dropdown Menu */}
            {isOpen && query.trim() && !isLoading && (
                <ul className="combobox-dropdown">
                    {options.length > 0 ? (
                        options.map((item) => (
                            <li
                                key={getKey(item)}
                                className="combobox-option"
                                onClick={() => handleSelect(item)}
                            >
                                {getDisplayValue(item)}
                            </li>
                        ))
                    ) : (
                        <li className="combobox-no-results">
                            {noResultsMessage}
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}


export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}