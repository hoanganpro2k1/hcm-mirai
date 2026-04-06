"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, Library, Trash } from "lucide-react";
import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { MediaLibraryModal } from "../features/admin/media/MediaLibraryModal";
import { Button } from "./button";

const subscribe = () => () => {};

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
  folder?: string;
}

export const ImageUpload = ({
  value,
  onChange,
  onRemove,
  folder = "general",
}: ImageUploadProps) => {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const onSelectFromLibrary = (url: string) => {
    onChange(url);
    setIsLibraryOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border group">
            <div className="absolute z-10 top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon-sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Uploaded image"
              src={value}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 text-slate-400">
            <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
            <p className="text-xs">Chưa chọn ảnh</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsLibraryOpen(true)}
          className={cn(
            "flex items-center gap-2 h-10 border-2 transition-all",
            value
              ? "border-slate-200 hover:border-primary hover:bg-primary/5 text-slate-600 hover:text-primary"
              : "border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 text-primary",
          )}
        >
          <Library className="h-4 w-4" />
          {value ? "Thay đổi ảnh từ thư viện" : "Chọn ảnh từ thư viện"}
        </Button>
      </div>

      <MediaLibraryModal
        isOpen={isLibraryOpen}
        onOpenChange={setIsLibraryOpen}
        onSelect={onSelectFromLibrary}
        title="Thư viện nội bộ"
        folder={folder}
      />
    </div>
  );
};
