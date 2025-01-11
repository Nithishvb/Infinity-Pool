import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const assets = [
  {
    id: 1,
    name: "Bored Ape #1234",
    type: "NFT",
    value: 100000,
    change: 5.2,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "CryptoPunk #5678",
    type: "NFT",
    value: 85000,
    change: -2.1,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "ETH-USDC LP Position",
    type: "LP Token",
    value: 250000,
    change: 1.8,
    image: "/placeholder.svg?height=48&width=48",
  },
];

export function AssetsList() {
  return (
    <div className="space-y-4">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="flex items-center gap-4 p-4 border rounded-lg"
        >
          <Image
            src={asset.image}
            alt={asset.name}
            width={48}
            height={48}
            className="rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-medium">{asset.name}</h4>
              <Badge variant="secondary">{asset.type}</Badge>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm font-medium">
                ${asset.value.toLocaleString()}
              </p>
              <span
                className={`text-xs ${
                  asset.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change >= 0 ? "+" : ""}
                {asset.change}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
