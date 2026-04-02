import { orderService } from '@/services/order.service';
import { OrderResponse } from '@/types/order.type';
import { useEffect, useRef, useState } from 'react';

export const useSearch = (isOpen: boolean) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [results, setResults] = useState<OrderResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(
      async () => {
        setIsLoading(true);
        try {
          const response = await orderService.searchOrders({ s: searchQuery, limit: 4 });
          if (response) {
            setResults(response);
          }
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      },
      searchQuery.trim() === '' ? 0 : 400,
    );

    return () => clearTimeout(timer);
  }, [searchQuery, isOpen]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    results,
    isLoading,
    inputRef,
  };
};
