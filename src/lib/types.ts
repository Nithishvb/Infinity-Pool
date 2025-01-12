export interface INewPool {
  name: string;
  description: string;
  targetSol: number;
  minimumSol: number;
  maxSol: number;
  assetType: "SOL";
}