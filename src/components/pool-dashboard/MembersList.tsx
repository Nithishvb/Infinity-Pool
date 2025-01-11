import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const members = [
  { id: 1, name: "Alice Johnson", contribution: 500000, votingWeight: 20, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Bob Smith", contribution: 400000, votingWeight: 16, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Carol Williams", contribution: 350000, votingWeight: 14, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "David Brown", contribution: 300000, votingWeight: 12, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Eve Davis", contribution: 250000, votingWeight: 10, avatar: "/placeholder.svg?height=40&width=40" },
]

export function MembersList({ limit }: { limit?: number }) {
  const displayMembers = limit ? members.slice(0, limit) : members

  return (
    <div className="space-y-4">
      {displayMembers.map((member) => (
        <div key={member.id} className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={member.avatar} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-none">{member.name}</p>
            <div className="flex items-center text-sm text-muted-foreground mt-1 gap-2">
              <span>${member.contribution.toLocaleString()}</span>
              <Progress value={member.votingWeight} className="h-1 w-20" />
              <span>{member.votingWeight}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

