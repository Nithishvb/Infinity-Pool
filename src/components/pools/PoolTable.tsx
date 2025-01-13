import { TableCell, TableRow } from "@/components/ui/table";

interface PoolsTableProps {
  name: string;
  description: string;
  assetType: string;
  totalFunds: number;
  status: string;
  id: string;
  handlePoolClick: (poolId: string) => void;
}

export const PoolTable = ({
  name,
  description,
  assetType,
  totalFunds,
  status,
  handlePoolClick,
  id,
}: PoolsTableProps) => {
  return (
    <TableRow
      className="cursor-pointer h-[60px] border-none hover:bg-gray-800/30"
      onClick={() => handlePoolClick(id)}
    >
      <TableCell>{name}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell className="text-center">{assetType}</TableCell>
      <TableCell className="text-center text-[#92F7CB]">${totalFunds}</TableCell>
      <TableCell>
        <span className="dark:bg-purple-900 px-2 py-1 rounded text-sm text-[#92F7CB]">
          {status}
        </span>
      </TableCell>
    </TableRow>
  );
};
