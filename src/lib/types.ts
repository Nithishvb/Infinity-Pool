export interface IPool {
  id: string;
  name: string;
  description: string;
  assetType: "SOL";
  creatorId: string;
  minContribution: number;
  maxContribution: number;
  targetFunds: number;
  totalCollectedSol: number;
  status: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
}

export interface IPoolDetails {
  id: string;
  name: string;
  description: string;
  assetType: "SOL";
  creatorId: string;
  minContribution: number;
  maxContribution: number;
  targetFunds: number;
  totalCollectedSol: number;
  status: "OPEN" | "CLOSED";
  createdAt: string;
  updatedAt: string;
  proposals: [],
  contributions: []
  assets: []
}
