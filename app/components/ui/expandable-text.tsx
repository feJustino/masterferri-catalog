'use client';

import { Button } from '@/components/ui/button';
import parse from 'html-react-parser';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function ExpandableDescription({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se o conteúdo é maior que 3 linhas
    if (descriptionRef.current) {
      const lineHeight = parseInt(
        window.getComputedStyle(descriptionRef.current).lineHeight
      );
      const maxHeight = lineHeight * 3; // 3 linhas

      if (descriptionRef.current.scrollHeight > maxHeight) {
        setShowButton(true);
      }
    }
  }, [content]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Descrição</h3>
      <div
        ref={descriptionRef}
        className={`text-secondary-00 transition-all duration-300 overflow-hidden bg-primary-300${
          isExpanded ? 'max-h-none' : 'max-h-[4.5rem]'
        }`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'none' : 3,
          WebkitBoxOrient: 'vertical',
          overflow: isExpanded ? 'visible' : 'hidden',
        }}
      >
        {parse(content)}
      </div>

      {showButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Ver menos
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Ver mais
            </>
          )}
        </Button>
      )}
    </div>
  );
}
