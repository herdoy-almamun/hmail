"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button, Flex } from "@radix-ui/themes";

interface Poprs {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({ itemsCount, pageSize, currentPage, setPage }: Poprs) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount <= 1) return null;

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Flex align="center" gap="3" p="2">
      <p>
        Page {currentPage} of {pageCount}
      </p>
      <Flex align="center" gap="3">
        <Button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(1)}
          variant="soft"
        >
          <ChevronsLeft />
        </Button>
        <Button
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          variant="soft"
        >
          <ChevronLeft />
        </Button>

        <Button
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(currentPage + 1)}
          variant="soft"
        >
          <ChevronRight />
        </Button>

        <Button
          disabled={currentPage === pageCount}
          onClick={() => handlePageChange(pageCount)}
          variant="soft"
        >
          <ChevronsRight />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
