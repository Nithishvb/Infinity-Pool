import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Proposal } from "@/lib/types";

const statusStyles = {
  PENDING: "bg-blue-500/10 text-blue-400",
  APPROVED: "bg-green-500/10 text-green-400",
  REJECTED: "bg-red-500/10 text-red-400",
};

export function ProposalsList({
  proposals,
  limit,
}: {
  proposals: Proposal[];
  limit?: number;
}) {
  const displayProposals = limit ? proposals.slice(0, limit) : proposals;

  return (
    <div className="space-y-4">
      {displayProposals.length > 0 ? (
        displayProposals.map((proposal) => (
          <div
            key={proposal.id}
            className="flex items-center justify-between p-4 border border-gray-800 rounded-lg bg-[#1A1A1A]/50"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium text-gray-200">
                  {proposal.description}
                </h4>
                <Badge
                  variant="secondary"
                  className={
                    statusStyles[proposal.status as keyof typeof statusStyles]
                  }
                >
                  {proposal.status === "PENDING" ? "Active" : proposal.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-sm text-gray-400">
                  For: {2}%
                </p>
                <p className="text-sm text-gray-400">
                  Against: {2}%
                </p>
              </div>
            </div>
            {proposal.status === "PENDING" && (
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border-gray-800 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Vote
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className="text-white text-center p-4">
          No proposal have been created from this pool yet.
        </div>
      )}
    </div>
  );
}
