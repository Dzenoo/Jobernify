import React from 'react';

import { getTruncatedPageRange } from '@/lib/utils';

import usePagination from '@/hooks/defaults/usePagination.hook';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

type PaginationProps = {
  totalItems: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  currentPage: number;
};

const PaginatedList: React.FC<PaginationProps> = ({
  totalItems,
  onPageChange,
  itemsPerPage,
  currentPage,
}) => {
  const { totalPages } = usePagination({
    totalItems,
    itemsPerPage,
  });

  const pageRange = getTruncatedPageRange(currentPage, totalPages, 10);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 ? (
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          ) : (
            <PaginationPrevious isActive={false} />
          )}
        </PaginationItem>

        {pageRange.map((pageOrEllipsis, index) => {
          if (pageOrEllipsis === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else {
            const pageNumber = pageOrEllipsis as number;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={currentPage === pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        <PaginationItem>
          {currentPage < totalPages ? (
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          ) : (
            <PaginationNext isActive={false} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginatedList;
