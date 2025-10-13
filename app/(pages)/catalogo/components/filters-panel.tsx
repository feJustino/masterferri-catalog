'use client';
import { useState, useEffect } from 'react';
import { useDebounce } from '@/app/hooks/useDebounce';

interface PriceRange {
  min: string;
  max: string;
}

interface FiltersPanelProps {
  isVisible: boolean;
  priceRange: PriceRange;
  onPriceRangeChange: (range: PriceRange) => void;
  debounceMs?: number;
}

export default function FiltersPanel({
  isVisible,
  priceRange,
  onPriceRangeChange,
  debounceMs = 800,
}: FiltersPanelProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  const debouncedPriceRange = useDebounce(localPriceRange, debounceMs);

  // Trigger price change when debounced value changes
  useEffect(() => {
    onPriceRangeChange(debouncedPriceRange);
  }, [debouncedPriceRange, onPriceRangeChange]);

  // Sync with external changes
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleMinPriceChange = (value: string) => {
    setLocalPriceRange(prev => ({
      ...prev,
      min: value,
    }));
  };

  const handleMaxPriceChange = (value: string) => {
    setLocalPriceRange(prev => ({
      ...prev,
      max: value,
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white p-4 rounded-lg mb-6 border border-gray-200">
      <div className="space-y-4">
        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Faixa de Preço
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="number"
              placeholder="Preço mínimo"
              value={localPriceRange.min}
              onChange={e => handleMinPriceChange(e.target.value)}
              className="flex-1 px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-center justify-center text-gray-500 text-sm sm:px-2">
              até
            </div>
            <input
              type="number"
              placeholder="Preço máximo"
              value={localPriceRange.max}
              onChange={e => handleMaxPriceChange(e.target.value)}
              className="flex-1 px-3 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
