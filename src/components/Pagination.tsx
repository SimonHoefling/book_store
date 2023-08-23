// src/components/Pagination.tsx
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

interface PaginationProps {
  totalItems: number; // Explicitly define the type as number
  itemsPerPage: number; // Explicitly define the type as number
  currentPage: number; // Explicitly define the type as number
  onPageChange: (page: number) => void; // Explicitly define the type of the function
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever currentPage changes
  }, [currentPage]);

  return (
    <div className="pagination-controls text-center mb-auto">
      <Button
        variant="btn btn-outline-secondary mx-2"
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <span className="mx-3">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="btn btn-outline-secondary mx-2"
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
