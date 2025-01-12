import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const members = [
  {
    id: 1,
    name: "Alice Johnson",
    contribution: 500000,
    votingWeight: 20,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    contribution: 400000,
    votingWeight: 16,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Williams",
    contribution: 350000,
    votingWeight: 14,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Brown",
    contribution: 300000,
    votingWeight: 12,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Eve Davis",
    contribution: 250000,
    votingWeight: 10,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export function MembersList({ limit }: { limit?: number }) {
  const displayMembers = limit ? members.slice(0, limit) : members;

  return (
    <div className="space-y-3">
      {displayMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 rounded-lg bg-[#1A1A1A]/50 border border-gray-800 h-20"
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-gray-800 text-gray-300">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-200">{member.name}</p>
              <p className="text-xs text-gray-400 pt-1">
                ${member.contribution.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-gray-800 text-gray-300">
              {member.votingWeight}%
            </Badge>
            <Progress value={member.votingWeight} className="h-1 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
