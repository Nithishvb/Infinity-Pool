import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const proposals = [
  { 
    id: 1, 
    title: "Invest in Blue Chip NFTs", 
    status: "active",
    votes: { for: 65, against: 35 },
    deadline: "2024-02-01"
  },
  { 
    id: 2, 
    title: "Increase DeFi Yield Farming Allocation", 
    status: "approved",
    votes: { for: 82, against: 18 },
    deadline: "2024-01-28"
  },
  { 
    id: 3, 
    title: "Add New Asset Type Support", 
    status: "rejected",
    votes: { for: 45, against: 55 },
    deadline: "2024-01-25"
  },
]

const statusStyles = {
  active: "bg-blue-500/10 text-blue-500",
  approved: "bg-green-500/10 text-green-500",
  rejected: "bg-red-500/10 text-red-500"
}

export function ProposalsList({ limit }: { limit?: number }) {
  const displayProposals = limit ? proposals.slice(0, limit) : proposals

  return (
    <div className="space-y-4">
      {displayProposals.map((proposal) => (
        <div key={proposal.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">{proposal.title}</h4>
              <Badge variant="secondary" className={statusStyles[proposal.status as keyof typeof statusStyles]}>
                {proposal.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 mt-1">
              <p className="text-sm text-muted-foreground">
                For: {proposal.votes.for}%
              </p>
              <p className="text-sm text-muted-foreground">
                Against: {proposal.votes.against}%
              </p>
            </div>
          </div>
          {proposal.status === 'active' && (
            <Button variant="outline" size="sm">
              Vote
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

