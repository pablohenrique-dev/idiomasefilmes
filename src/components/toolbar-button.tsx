"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  handleClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  title?: string;
}

export function ToolbarButton({
  title,
  isActive,
  icon: Icon,
  handleClick,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex h-7 min-w-7 items-center justify-center rounded-sm text-sm hover:bg-neutral-400/80",
        isActive && "bg-neutral-400/80",
      )}
      title={title}
    >
      <Icon className="size-4" />
    </button>
  );
}
