'use client';

import { Icon } from '@iconify/react';
import { APIResponse, ProductReportSummary } from '../../../utils/types';
import React from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

const NoDataAvailable = () => (
  <div className="flex flex-col items-center justify-center">
    <Icon icon="mdi:close-circle" className="text-3xl text-gray-900" />
    <p className="text-base text-center">No data available</p>
  </div>
);

export default function ProductSummary({
  data,
}: APIResponse<ProductReportSummary>) {
  const dataTop5MostExpensiveProduct =
    data?.top5MostExpensiveProduct?.map((product) => ({
      name: product.name,
      price: product.price,
    })) || [];

  const dataTop5MostCheapestProduct =
    data?.top5MostCheapestProduct?.map((product) => ({
      name: product.name,
      price: product.price,
    })) || [];

  const dataTotalProductByStatus = data?.totalProductByStatus
    ? Object.keys(data?.totalProductByStatus)?.map((key) => ({
        name: key,
        value: data.totalProductByStatus[key],
      }))
    : [];

  const COLORS = ['#FFBB28', '#00C49F', '#ea2020'];

  return (
    <div className="w-full space-y-4">
      <div className="flex w-full space-x-4 overflow-auto">
        <div className="w-1/2 p-4 bg-white border rounded-sm shadow-sm md:w-1/4">
          <p className="text-lg font-medium text-gray-900">Total Stock</p>
          <p className="text-gray-800">{data?.totalStock}</p>
        </div>

        <div className="w-1/2 p-4 bg-white border rounded-sm shadow-sm md:w-1/4">
          <p className="text-lg font-medium text-gray-900">Total Product</p>
          <p className="text-gray-800">{data?.totalProduct}</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-y-4">
        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="mb-5 text-xl font-medium text-center">
            Total Stock By Status
          </p>
          {dataTotalProductByStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart width={350} height={300}>
                <Pie
                  data={dataTotalProductByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label
                  // label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataTotalProductByStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <NoDataAvailable />
          )}
        </div>

        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="mb-5 text-xl font-medium text-center">
            Top Expensive Product
          </p>

          {dataTop5MostExpensiveProduct.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={730}
                height={250}
                data={dataTop5MostExpensiveProduct}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <NoDataAvailable />
          )}
        </div>

        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="mb-5 text-xl font-medium text-center">
            Top Cheapest Product
          </p>
          {dataTop5MostCheapestProduct.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                width={730}
                height={250}
                data={dataTop5MostCheapestProduct}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <NoDataAvailable />
          )}
        </div>
      </div>
    </div>
  );
}
