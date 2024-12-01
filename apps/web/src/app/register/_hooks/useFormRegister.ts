import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../../schema/authSchema';
import { useForm } from 'react-hook-form';
import { FetchApi } from '../../../utils/api';
import { z } from 'zod';
import { AUTH_SERVICE_REGISTER } from '../../../config/url';
import { useState } from 'react';

export const useFormRegister = () => {
  const $http = FetchApi();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    setIsLoading(true);
    try {
      const response = await $http(AUTH_SERVICE_REGISTER, {
        method: 'POST',
        data: values,
      });

      if (response) {
        console.log(response.data);
        reset();
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(true);
      console.error(error);
    }
  }

  function onError(errors: any) {
    console.log(errors);
  }

  return {
    errors,
    handleSubmit,
    register,
    onSubmit,
    onError,
  };
};
