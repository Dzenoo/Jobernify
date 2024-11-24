type UsePaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

type UsePagination = {
  totalPages: number;
};

const usePagination = ({
  totalItems,
  itemsPerPage,
}: UsePaginationProps): UsePagination => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    totalPages,
  };
};

export default usePagination;
