'use client';

import { Product } from '../../../utils/types';
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

interface ProductSummaryProps {
  totalProductByStatus: {
    [key: string]: number;
  };
  top5MostExpensiveProduct: Product[];
  top5MostCheapestProduct: Product[];
  totalStock: number;
  totalProduct: number;
}

export default function ProductSummary({
  data,
}: {
  data?: ProductSummaryProps;
}) {
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

  // const RADIAN = Math.PI / 180;
  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  //   index,
  // }) => {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor={x > cx ? 'start' : 'end'}
  //       dominantBaseline="central"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

  return (
    <div className="w-full space-y-4">
      <div className="grid w-full grid-cols-1 md:grid-cols-4 md:gap-x-4">
        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="text-lg font-medium text-gray-900">Total Stock</p>
          <p className="text-gray-800">{data?.totalStock}</p>
        </div>

        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="text-lg font-medium text-gray-900">Total Product</p>
          <p className="text-gray-800">{data?.totalProduct}</p>
        </div>
      </div>
      <div className="grid w-full grid-cols-1 gap-y-4">
        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="mb-5 text-2xl font-medium text-center">
            Total Stock By Status
          </p>
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
        </div>

        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="mb-5 text-2xl font-medium text-center">
            Top Expensive Product
          </p>
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
        </div>

        <div className="p-4 bg-white border rounded-sm shadow-sm">
          <p className="mb-5 text-2xl font-medium text-center">
            Top Cheapest Product
          </p>
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
        </div>
      </div>
    </div>
  );
}
