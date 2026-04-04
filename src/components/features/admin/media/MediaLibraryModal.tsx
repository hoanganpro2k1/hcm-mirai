"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MediaItem, mediaService } from "@/services/media.service";
import {
  Check,
  Image as ImageIcon,
  Loader2,
  Plus,
  Search,
  Trash,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface MediaLibraryModalProps {
  onSelect: (url: string) => void;
  title?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  allowMultiple?: boolean;
  folder?: string;
}

export function MediaLibraryModal({
  onSelect,
  title = "Thư viện ảnh",
  isOpen,
  onOpenChange,
  allowMultiple = false,
  folder = "general",
}: MediaLibraryModalProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMedia = useCallback(
    async (pageNum: number, isNewSearch = false) => {
      try {
        setIsLoading(true);
        const response = await mediaService.getMedia({
          page: pageNum,
          limit: 12,
          search: searchTerm,
          folder: folder,
        });

        if (isNewSearch) {
          setMediaItems(response.data);
        } else {
          setMediaItems((prev) => [...prev, ...response.data]);
        }

        setHasMore(response.hasMore);
        setPage(pageNum);
      } catch {
        toast.error("Không thể tải thư viện ảnh");
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, folder],
  );

  // Fetch initial data or when search changes
  useEffect(() => {
    if (isOpen) {
      fetchMedia(1, true);
    }
  }, [isOpen, fetchMedia]);

  const handleLoadMore = () => {
    fetchMedia(page + 1);
  };

  const onUploadSuccess = async (result: any) => {
    if (result.event === "success") {
      try {
        const info = result.info;
        const newMedia = await mediaService.saveMedia({
          url: info.secure_url,
          public_id: info.public_id,
          fileName: info.original_filename,
          mimeType: `${info.resource_type}/${info.format}`,
          size: info.bytes,
          width: info.width,
          height: info.height,
          folder: folder,
        });

        setMediaItems((prev) => [newMedia, ...prev]);
        toast.success("Đã tải ảnh lên thư viện");
      } catch {
        toast.error("Lỗi khi lưu thông tin ảnh vào thư viện");
      }
    }
  };

  const handleToggleSelect = (item: MediaItem) => {
    if (allowMultiple) {
      setSelectedIds((prev) =>
        prev.includes(item.id)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id],
      );
    } else {
      setSelectedIds([item.id]);
    }
  };

  const handleConfirmSelection = () => {
    const selected = mediaItems.filter((item) => selectedIds.includes(item.id));
    if (selected.length > 0) {
      onSelect(selected[0].url);
      onOpenChange(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;

    if (
      !confirm(
        `Bạn có chắc chắn muốn xóa ${selectedIds.length} ảnh này khỏi thư viện?`,
      )
    ) {
      return;
    }

    try {
      setIsDeleting(true);
      await mediaService.deleteMedia(selectedIds);
      setMediaItems((prev) =>
        prev.filter((item) => !selectedIds.includes(item.id)),
      );
      setSelectedIds([]);
      toast.success("Đã xóa ảnh thành công (xóa mềm)");
    } catch {
      toast.error("Lỗi khi xóa ảnh");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              {title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <CldUploadWidget
                onSuccess={onUploadSuccess}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                  folder: folder,
                  clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
                }}
              >
                {({ open }) => (
                  <Button onClick={() => open()} size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Tải ảnh lên
                  </Button>
                )}
              </CldUploadWidget>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Tìm kiếm ảnh theo tên..."
                className="pl-9 bg-slate-50 border-slate-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDeleteSelected}
                disabled={isDeleting}
                className="gap-2"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash className="h-4 w-4" />
                )}
                Xóa {selectedIds.length} mục
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
          {mediaItems.length === 0 && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
              <p>Không tìm thấy ảnh nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mediaItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleSelect(item)}
                  className={cn(
                    "group relative aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                    selectedIds.includes(item.id)
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-slate-300",
                  )}
                >
                  <Image
                    src={item.url}
                    alt={item.fileName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center",
                      selectedIds.includes(item.id) && "opacity-100",
                    )}
                  >
                    {selectedIds.includes(item.id) ? (
                      <div className="bg-primary text-white p-1 rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded pointer-events-none">
                        Click để chọn
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-black/60 text-[10px] text-white truncate pointer-events-none">
                    {item.fileName}
                  </div>
                </div>
              ))}
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-200 animate-pulse rounded-lg"
                  />
                ))}
            </div>
          )}

          {hasMore && (
            <div className="mt-8 flex justify-center pb-8">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="w-40"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Xem thêm
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="p-4 border-t bg-white">
          <div className="flex w-full items-center justify-between">
            <p className="text-sm text-slate-500">
              {mediaItems.length > 0 && `Hiển thị ${mediaItems.length} ảnh`}
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button
                onClick={handleConfirmSelection}
                disabled={selectedIds.length === 0}
                className="px-8"
              >
                Chọn ảnh
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
