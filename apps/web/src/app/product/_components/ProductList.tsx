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
import TableRoot from '../../../components/table';
import Select from '../../../components/select';

export default function ProductList({
  products = [],
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
  const perPageOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
  ];

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
      page: '1',
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
          <Select
            options={perPageOptions}
            value={perPage}
            onChange={handleChangePerPage}
            className="w-20"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <TableRoot>
          <TableRoot.Head>
            <TableRoot.Row>
              <TableRoot.Header>ID</TableRoot.Header>
              <TableRoot.Header>Product Name</TableRoot.Header>
              <TableRoot.Header>Price</TableRoot.Header>
              <TableRoot.Header>Stock</TableRoot.Header>
              <TableRoot.Header>Status</TableRoot.Header>
              <TableRoot.Header>Description</TableRoot.Header>
              <TableRoot.Header className="text-right">Action</TableRoot.Header>
            </TableRoot.Row>
          </TableRoot.Head>
          <TableRoot.Body>
            {products.length > 0 ? (
              products.map((product, index) => (
                <TableRoot.Row
                  className="bg-white border-b hover:bg-gray-50"
                  key={index}
                >
                  <TableRoot.Cell className="font-medium text-gray-900">
                    {product.id}
                  </TableRoot.Cell>
                  <TableRoot.Cell>{product.name}</TableRoot.Cell>
                  <TableRoot.Cell>
                    {product.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    })}
                  </TableRoot.Cell>
                  <TableRoot.Cell>{product.stock}</TableRoot.Cell>
                  <TableRoot.Cell>
                    <Badge status={product.status} />
                  </TableRoot.Cell>
                  <TableRoot.Cell className="truncate">
                    {product.description}
                  </TableRoot.Cell>
                  <TableRoot.Cell className="text-right">
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
                  </TableRoot.Cell>
                </TableRoot.Row>
              ))
            ) : (
              <TableRoot.Row>
                <TableRoot.Cell colSpan={7} className="text-center">
                  No data found
                </TableRoot.Cell>
              </TableRoot.Row>
            )}
          </TableRoot.Body>
        </TableRoot>
      </div>

      <Dialog
        title={`Are you sure to delete this product '${selectedProduct?.name}'?`}
        isShowButtonTrigger={false}
        open={openDialog}
        onSubmit={() => {
          handleDelete();
        }}
        isLoadingSubmit={isLoading}
        onCancel={onCancelDialog}
      />

      {paginations?.total > 0 && (
        <Pagination
          totalPage={paginations.total}
          currentPage={paginations.page}
          perPage={paginations.perPage}
          onChangePagination={(page) => {
            handleChangePagination(page);
          }}
        />
      )}
    </div>
  );
}
