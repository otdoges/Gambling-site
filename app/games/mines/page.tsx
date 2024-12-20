"use client";

import { MinesGame } from "@/components/games/mines/mines-game";
import { MinesProvider } from "@/components/games/mines/mines-context";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function MinesPage() {
  return (
    <MinesProvider>
      <div className="min-h-screen bg-[#0F1923] text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Mines</h1>
          </div>
          <MinesGame />
        </div>
      </div>
    </MinesProvider>
  );
}