import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import usePagination from "@/hooks/defaults/usePagination";

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
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
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
