'use client';

import Pagination from '../../../components/pagination';
import { Product, Paginations } from '../../../utils/types';

export default function ProductList({
  products,
  paginations,
}: {
  products: Product[];
  paginations: Paginations;
}) {
  return (
    <div className="flex flex-col w-full">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3 text-nowrap">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr className="bg-white border-b hover:bg-gray-50 " key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4 truncate">{product.description}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>{paginations.total}</div>

      <Pagination
        totalPage={paginations.total}
        currentPage={paginations.page}
        onChangePagination={(page) => {
          console.log(page);
        }}
      />
    </div>
  );
}
