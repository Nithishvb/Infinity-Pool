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
  proposals: Proposal[],
  contributions: []
  assets: []
}

enum ProposalType {
  "BUY",
  "SELL",
}

enum ProposalStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

interface Pool {
  id: string;
}

interface User {
  id: string;
}


export interface Proposal {
  id: string;
  description: string;
  type: ProposalType;
  poolId: string;
  pool: Pool;
  proposerId: string;
  proposer: User;
  status: ProposalStatus;
  createdAt: Date;
  votes: []
}
