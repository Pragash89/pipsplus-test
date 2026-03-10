"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

const modalSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
  showCloseButton = true,
  className,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "transition-all duration-200"
          )}
        />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
            "w-full bg-white rounded-2xl shadow-2xl border border-[#E5E7EB]",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "transition-all duration-200",
            modalSizes[size],
            className
          )}
          onEscapeKeyDown={onClose}
          onInteractOutside={onClose}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-[#E5E7EB]">
              <div className="flex flex-col gap-1">
                {title && (
                  <Dialog.Title className="text-lg font-semibold text-[#111827] leading-tight">
                    {title}
                  </Dialog.Title>
                )}
                {description && (
                  <Dialog.Description className="text-sm text-[#6B7280] leading-relaxed">
                    {description}
                  </Dialog.Description>
                )}
              </div>

              {showCloseButton && (
                <Dialog.Close asChild>
                  <button
                    onClick={onClose}
                    className={cn(
                      "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg",
                      "text-[#6B7280] hover:text-[#111827] hover:bg-[#F3F4F6]",
                      "transition-colors duration-150",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E40AF]"
                    )}
                    aria-label="Close modal"
                  >
                    <X size={16} />
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}

          <div className="px-6 py-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export { Modal };
export type { ModalProps };
