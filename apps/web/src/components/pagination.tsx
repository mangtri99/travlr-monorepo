export default function Pagination({
  totalPage,
  currentPage,
  perPage,
  onChangePagination,
}: {
  totalPage: number;
  currentPage: number;
  perPage: number;
  onChangePagination?: (page: number) => void;
}) {
  const MAX_PAGINATION = 5;

  const createPagination = () => {
    const pages = [];
    let start = 1;
    let end = totalPage;

    if (totalPage > MAX_PAGINATION) {
      if (currentPage > MAX_PAGINATION - 1) {
        start = currentPage - 2;
        end = currentPage + 2;
        if (end > totalPage) {
          end = totalPage;
          start = end - MAX_PAGINATION + 1;
        }
      } else {
        start = 1;
        end = MAX_PAGINATION;
      }
    }

    if (end >= Math.ceil(totalPage / perPage)) {
      start = Math.ceil(totalPage / perPage) - MAX_PAGINATION + 1;
      end = Math.ceil(totalPage / perPage);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i}>
          <a
            role="button"
            onClick={() => onChangePagination && onChangePagination(i)}
            className={`flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ${
              i === currentPage
                ? '!bg-gray-300 text-gray-700 '
                : 'hover:bg-gray-100 hover:text-gray-700'
            }`}
          >
            {i}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <nav className="flex justify-end mt-4">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() =>
              onChangePagination && onChangePagination(currentPage - 1)
            }
            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Prev
          </button>
        </li>

        {createPagination()}

        <li>
          <button
            role="button"
            onClick={() =>
              onChangePagination && onChangePagination(currentPage + 1)
            }
            disabled={currentPage === totalPage}
            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
