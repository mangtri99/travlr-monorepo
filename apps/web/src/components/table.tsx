import { cn } from '../utils/common';

const TableRoot = ({
  children,
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) => {
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
}: React.TableHTMLAttributes<HTMLTableSectionElement>) => {
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
}: React.TableHTMLAttributes<HTMLTableCellElement>) => {
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
}: React.TableHTMLAttributes<HTMLTableSectionElement>) => {
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
}: React.TableHTMLAttributes<HTMLTableRowElement>) => {
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
  colSpan = 1,
  ...props
}: React.TableHTMLAttributes<HTMLTableCellElement> & { colSpan?: number }) => {
  return (
    <td colSpan={colSpan} className={cn('px-4 py-3', className)} {...props}>
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
