'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../../../components/pagination';
import { Product, Paginations } from '../../../utils/types';
import Link from 'next/link';
import { useState } from 'react';
import Input from '../../../components/input';
import Button from '../../../components/button';
import Badge from '../../../components/badge';
import Dialog from '../../../components/dialog';
import { useSession } from 'next-auth/react';
import { FetchApi } from '../../../utils/api';
import { toast } from 'sonner';
import { PRODUCT_SERVICE } from '../../../config/url';

export default function ProductList({
  products,
  paginations,
}: {
  products: Product[];
  paginations: Paginations;
}) {
  const { data: session } = useSession();
  const $http = FetchApi(session);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [perPage, setPerPage] = useState(searchParams.get('perPage') || 10);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const onCancelDialog = () => {
    setSelectedProduct(null);
    setOpenDialog(false);
  };

  const handleChangePagination = (page: number) => {
    // push to current with query params
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    const qs = new URLSearchParams({
      ...searchParamsObject,
      page: page.toString(),
    }).toString();

    const newUrl = `${pathname}?${qs}`;

    router.push(newUrl);
  };

  const handleSearch = () => {
    // push to current with query params
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    const qs = new URLSearchParams({
      ...searchParamsObject,
      page: '1',
      search,
    }).toString();

    const newUrl = `${pathname}?${qs}`;

    router.push(newUrl);
  };

  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    // push to current with query params
    const searchParamsObject = Object.fromEntries(searchParams.entries());
    const qs = new URLSearchParams({
      ...searchParamsObject,
      perPage: e.target.value,
    }).toString();

    const newUrl = `${pathname}?${qs}`;

    router.push(newUrl);
  };

  const handleDelete = async () => {
    if (!selectedProduct?.id) {
      toast.error('Failed to delete data');
      return;
    }

    setIsLoading(true);
    try {
      const response = await $http(`${PRODUCT_SERVICE}/${selectedProduct.id}`, {
        method: 'DELETE',
      });
      setIsLoading(false);
      if (response) {
        console.log(response.data);
        toast.success('Product deleted successfully');
        setOpenDialog(false);

        // refresh data
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error('Failed to delete data');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Input
            id="search"
            type="search"
            className="w-48 py-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button type="button" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div>
          <select
            className="w-20 py-1 border border-gray-300 rounded-md form-select"
            value={perPage}
            onChange={handleChangePerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-4 py-3">
                ID
              </th>
              <th scope="col" className="px-4 py-3 text-nowrap">
                Product Name
              </th>
              <th scope="col" className="px-4 py-3">
                Price
              </th>
              <th scope="col" className="px-4 py-3">
                Stock
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr className="bg-white border-b hover:bg-gray-50 " key={index}>
                <th
                  scope="row"
                  className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap "
                >
                  {product.id}
                </th>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.price}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">
                  <Badge status={product.status} />
                </td>
                <td className="px-4 py-3 truncate">{product.description}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/product/${product.id}/edit`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>

                  <a
                    role="button"
                    className="ml-4 font-medium text-red-600 hover:underline"
                    onClick={() => onDeleteProduct(product)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        title={`Are you sure to delete this product '${selectedProduct?.name}'?`}
        isShowButtonTrigger={false}
        open={openDialog}
        onSubmit={() => {
          handleDelete();
        }}
        onCancel={onCancelDialog}
      />

      <Pagination
        totalPage={paginations.total}
        currentPage={paginations.page}
        onChangePagination={(page) => {
          handleChangePagination(page);
        }}
      />
    </div>
  );
}
