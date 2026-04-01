"use client";

import { ImageIcon, ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useSyncExternalStore } from "react";
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
  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const onUpload = (result: any) => {
    if (result.event === "success") {
      onChange(result.info.secure_url);
    }
  };

  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!isMounted) {
    return null;
  }

  if (!uploadPreset || !cloudName) {
    return (
      <div className="p-4 border-2 border-dashed border-red-200 bg-red-50 text-red-600 rounded-md text-sm">
        <p className="font-bold text-base mb-1">⚠️ Thiếu cấu hình Cloudinary!</p>
        <p>Vui lòng kiểm tra file <code className="bg-red-100 px-1 rounded">.env.local</code> và <strong>khởi động lại server</strong> (pnpm dev).</p>
        <div className="mt-2 flex gap-4 opacity-80 decoration-dotted">
           <span>Cloud: {cloudName ? "✅ " + cloudName : "❌ Thiếu"}</span>
           <span>Preset: {uploadPreset ? "✅ " + uploadPreset : "❌ Thiếu"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden border">
            <div className="absolute z-10 top-2 right-2">
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
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 text-slate-400">
            <ImageIcon className="h-10 w-10 mb-2 opacity-20" />
            <p className="text-xs">Chưa có ảnh</p>
          </div>
        )}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          folder: folder,
          maxFiles: 1,
          clientAllowedFormats: ["png", "jpeg", "jpg", "webp"],
          theme: "minimal",
        }}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              variant="secondary"
              onClick={onClick}
              className="flex items-center gap-2"
            >
              <ImagePlus className="h-4 w-4" />
              {value ? "Thay đổi ảnh" : "Tải ảnh lên"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
