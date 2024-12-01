'use client';

import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/input';
import Label from '../../components/label';
import Button from '../../components/button';
import { z } from 'zod';
import { loginSchema } from '../../schema/authSchema';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function onError(errors: any) {
    console.log(errors);
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-screen">
      <div className="w-full max-w-sm p-4 bg-white border rounded-md shadow-sm">
        <h1 className="mb-4 text-xl font-bold text-center">Travlr Test</h1>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-invalid={errors.email ? 'true' : 'false'}
                message={errors.email?.message}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                aria-invalid={errors.password ? 'true' : 'false'}
                message={errors.password?.message}
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <div className="text-sm text-gray-700">
                Dont have account?{' '}
                <Link
                  className="text-blue-500 underline hover:no-underline"
                  href="/register"
                >
                  Register here
                </Link>
              </div>
              <Button type="submit">Login</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
