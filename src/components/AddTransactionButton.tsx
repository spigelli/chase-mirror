"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TransactionForm } from "./TransactionForm";

export function AddTransactionButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-20 right-6">
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <TransactionForm open={open} onOpenChange={setOpen} />
    </div>
  );
} 