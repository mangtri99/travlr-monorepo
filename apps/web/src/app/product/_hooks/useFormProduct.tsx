import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FetchApi } from '../../../utils/api';
import { PRODUCT_SERVICE } from '../../../config/url';
import { useState } from 'react';
import { productSchema, FormProductType } from '../../../schema/productSchema';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export const useFormProduct = (
  defaultValues?: FormProductType,
  isEdit = false
) => {
  const { data: session } = useSession();
  const $http = FetchApi(session);

  const productStatuses = [
    {
      label: 'Available',
      value: 'available',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
    {
      label: 'Sold',
      value: 'sold',
    },
  ];

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<FormProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      price: defaultValues?.price || 0,
      description: defaultValues?.description || '',
      stock: defaultValues?.stock || 0,
      status: defaultValues?.status || 'available',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: FormProductType) {
    console.log(values);
    setIsLoading(true);

    const uri = isEdit
      ? `${PRODUCT_SERVICE}/${defaultValues?.id}`
      : PRODUCT_SERVICE;

    try {
      const response = await $http(uri, {
        method: isEdit ? 'PUT' : 'POST',
        data: values,
      });

      if (response) {
        console.log(response.data);
        if (!isEdit) {
          toast.success('Product created successfully');
          reset();
        } else {
          toast.success('Product updated successfully');
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.error(error);
      toast.error('Failed to save product', {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        description: error?.data?.message || 'Something went wrong',
      });
    }
  }

  function onError(errors: any) {
    console.log(errors);
  }

  return {
    isLoading,
    errors,
    handleSubmit,
    register,
    onSubmit,
    onError,
    productStatuses,
  };
};
