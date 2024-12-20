"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export function GameCard({ title, description, icon, href }: GameCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          {icon}
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button className="w-full">Play Now</Button>
        </Link>
      </CardContent>
    </Card>
  );
}