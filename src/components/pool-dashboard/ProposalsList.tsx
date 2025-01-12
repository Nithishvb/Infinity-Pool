import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const proposals = [
  {
    id: 1,
    title: "Invest in Blue Chip NFTs",
    status: "active",
    votes: { for: 65, against: 35 },
    deadline: "2024-02-01",
  },
  {
    id: 2,
    title: "Increase DeFi Yield Farming Allocation",
    status: "approved",
    votes: { for: 82, against: 18 },
    deadline: "2024-01-28",
  },
  {
    id: 3,
    title: "Add New Asset Type Support",
    status: "rejected",
    votes: { for: 45, against: 55 },
    deadline: "2024-01-25",
  },
];

const statusStyles = {
  active: "bg-blue-500/10 text-blue-400",
  approved: "bg-green-500/10 text-green-400",
  rejected: "bg-red-500/10 text-red-400",
};

export function ProposalsList({ limit }: { limit?: number }) {
  const displayProposals = limit ? proposals.slice(0, limit) : proposals;

  return (
    <div className="space-y-4">
      {displayProposals.map((proposal) => (
        <div
          key={proposal.id}
          className="flex items-center justify-between p-4 border border-gray-800 rounded-lg bg-[#1A1A1A]/50"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium text-gray-200">
                {proposal.title}
              </h4>
              <Badge
                variant="secondary"
                className={
                  statusStyles[proposal.status as keyof typeof statusStyles]
                }
              >
                {proposal.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-gray-400">
                For: {proposal.votes.for}%
              </p>
              <p className="text-sm text-gray-400">
                Against: {proposal.votes.against}%
              </p>
            </div>
          </div>
          {proposal.status === "active" && (
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Vote
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
