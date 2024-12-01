'use client';
import { useFormRegister } from '../_hooks/useFormRegister';
import Label from '../../../components/label';
import Input from '../../../components/input';
import Link from 'next/link';
import Button from '../../../components/button';

export default function FormGroup() {
  const { errors, handleSubmit, register, onSubmit, onError } =
    useFormRegister();

  return (
    <div className="w-full max-w-sm p-4 bg-white border rounded-md shadow-sm">
      <h1 className="mb-4 text-xl font-bold text-center">Register</h1>
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

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              message={errors.confirmPassword?.message}
            />
          </div>

          <div className="flex items-center justify-end space-x-4">
            <div className="text-sm text-gray-700">
              Already have account?{' '}
              <Link
                className="text-blue-500 underline hover:no-underline"
                href="/login"
              >
                Login here
              </Link>
            </div>
            <Button type="submit">Register</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
