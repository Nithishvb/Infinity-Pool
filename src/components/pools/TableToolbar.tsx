import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterProps {
  setAssetFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const TableToolbar = ({
  searchTerm,
  setStatusFilter,
  setAssetFilter,
  setSearchTerm,
}: FilterProps) => {
  return (
    <div className="flex items-center gap-8 mb-8">
      <div className="w-[40%]">
        <Select onValueChange={(value) => setAssetFilter(value)}>
          <SelectTrigger className="border-gray-600">
            <SelectValue placeholder="Filter by asset type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NONE">All Assets</SelectItem>
            <SelectItem value="SOL">SOL</SelectItem>
            <SelectItem value="ETH">ETH</SelectItem>
            <SelectItem value="MULTI">Multi-chain</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative w-full rouned-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by name"
          className="w-full pl-10 border-gray-600 placeholder:text-[#8B8B8B] text-base h-[36px]
        focus-visible:ring-0 focus-visible:ring-offset-0
        hover:border-gray-400 transition-colors"
        />
      </div>
      <div className="w-[40%]">
        <Select onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger className="border-gray-600">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NONE">All Status</SelectItem>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="CLOSES">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TableToolbar;
