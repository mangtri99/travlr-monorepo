import { cn } from '../utils/common';

const TableRoot = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <table
      className={cn('w-full text-sm text-left text-gray-500', className)}
      {...props}
    >
      {children}
    </table>
  );
};

const TableHead = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <thead
      className={cn('text-xs text-gray-700 uppercase bg-gray-50 ', className)}
      {...props}
    >
      {children}
    </thead>
  );
};

const TableHeader = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th className={cn('px-4 py-3 text-nowrap', className)} {...props}>
      {children}
    </th>
  );
};

const TableBody = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) => {
  return (
    <tbody className={cn(className)} {...props}>
      {children}
    </tbody>
  );
};

const TableRow = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) => {
  return (
    <tr
      className={cn('bg-white border-b hover:bg-gray-50', className)}
      {...props}
    >
      {children}
    </tr>
  );
};

const TableCell = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td className={cn('px-4 py-3', className)} {...props}>
      {children}
    </td>
  );
};

TableRoot.Head = TableHead;
TableRoot.Header = TableHeader;
TableRoot.Body = TableBody;
TableRoot.Row = TableRow;
TableRoot.Cell = TableCell;

export default TableRoot;
