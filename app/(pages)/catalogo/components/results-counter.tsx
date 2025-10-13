'use client';

interface ResultsCounterProps {
  filteredCount: number;
  totalCount: number;
  page: number;
}

export default function ResultsCounter({
  filteredCount,
  totalCount,
}: ResultsCounterProps) {
  return (
    <div className="text-sm text-gray-600 mb-4 px-1">
      {filteredCount === totalCount
        ? `${totalCount} produtos`
        : `${filteredCount} de ${totalCount} produtos`}
    </div>
  );
}
