'use client';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/app/hooks/useDebounce';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  debounceMs?: number;
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  debounceMs = 500,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(searchTerm);
  const debouncedValue = useDebounce(localValue, debounceMs);

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  // Sync with external changes
  useEffect(() => {
    setLocalValue(searchTerm);
  }, [searchTerm]);

  const handleClear = () => {
    setLocalValue('');
  };

  return (
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={localValue}
        onChange={e => setLocalValue(e.target.value)}
        className="w-full pl-10 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
