export default function Pagination({
  totalPage,
  currentPage,
  onChangePagination,
}: {
  totalPage: number;
  currentPage: number;
  onChangePagination?: (page: number) => void;
}) {
  const MAX_PAGINATION = 5;

  const createPagination = () => {
    const pages = [];
    let start = 1;
    let end = totalPage;

    if (totalPage > MAX_PAGINATION) {
      if (currentPage > 3) {
        start = currentPage - 2;
      }

      if (currentPage + 2 < totalPage) {
        end = currentPage + 2;
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <li key={i}>
          <a
            role="button"
            onClick={() => onChangePagination && onChangePagination(i)}
            className={`flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ${
              i === currentPage
                ? 'bg-gray-300 text-gray-700 '
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
          <a
            href="#"
            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 ms-0 border-e-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Prev
          </a>
        </li>

        {createPagination()}

        <li>
          <a
            href="#"
            className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
