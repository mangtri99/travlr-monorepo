'use client';
import Label from '../../../components/label';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { useFormProduct } from '../_hooks/useFormProduct';
import { FormProductType } from '../../../schema/productSchema';

export default function ProductForm({
  defaultValues,
  isEdit = false,
}: {
  defaultValues?: FormProductType;
  isEdit?: boolean;
}) {
  const {
    isLoading,
    errors,
    handleSubmit,
    register,
    onSubmit,
    onError,
    productStatuses,
  } = useFormProduct(defaultValues, isEdit);

  return (
    <div className="w-full p-4 bg-white border rounded-md shadow-sm">
      <h1 className="mb-4 text-xl font-bold text-left">Product Create</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
              message={errors.name?.message}
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              {...register('price', { valueAsNumber: true })}
              aria-invalid={errors.price ? 'true' : 'false'}
              message={errors.price?.message}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              {...register('description')}
              aria-invalid={errors.description ? 'true' : 'false'}
              message={errors.description?.message}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register('stock', { valueAsNumber: true })}
              aria-invalid={errors.stock ? 'true' : 'false'}
              message={errors.stock?.message}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Status</Label>
            <select
              className="w-32 py-1 border border-gray-300 rounded-md form-select"
              {...register('status')}
            >
              {productStatuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
