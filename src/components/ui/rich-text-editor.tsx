"use client";

import { MediaLibraryModal } from "@/components/features/admin/media/MediaLibraryModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Extension } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { NodeSelection } from "@tiptap/pm/state";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowUpDown,
  Bold,
  ChevronDown,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  List,
  ListOrdered,
  Redo,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "./button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  folder?: string;
}

const MenuBar = ({
  editor,
  folder,
}: {
  editor: Editor | null;
  folder?: string;
}) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  if (!editor) return null;

  const addImage = () => {
    setIsMediaModalOpen(true);
  };

  const handleImageSelect = (url: string) => {
    editor
      .chain()
      .focus()
      .setImage({ src: url, width: "25%" } as any)
      .run();
    setIsMediaModalOpen(false);
  };

  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-slate-50 dark:bg-slate-900 sticky top-0 z-10 transition-colors">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          editor.isActive("bold") && "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          editor.isActive("italic") && "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          editor.isActive("underline") && "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          editor.isActive("heading", { level: 2 }) &&
            "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          editor.isActive("heading", { level: 3 }) &&
            "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <Heading3 className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          editor.isActive("bulletList") && "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          editor.isActive("orderedList") && "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />

      <Button type="button" variant="ghost" size="icon-sm" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button type="button" variant="ghost" size="icon-sm" onClick={addTable}>
        <TableIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={cn(
          editor.isActive({ textAlign: "left" }) &&
            "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={cn(
          editor.isActive({ textAlign: "center" }) &&
            "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={cn(
          editor.isActive({ textAlign: "right" }) &&
            "bg-slate-200 dark:bg-slate-800",
        )}
      >
        <AlignRight className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />

      {(() => {
        const isImageActive =
          editor.isActive("image") ||
          (editor.state.selection instanceof NodeSelection &&
            editor.state.selection.node.type.name === "image");

        if (!isImageActive) return null;

        return (
          <div className="flex items-center gap-1 px-2 border-l border-r border-slate-300 dark:border-slate-700 mx-1">
            <span className="text-[10px] font-medium text-slate-500 uppercase mr-1">
              Size:
            </span>
            <Button
              type="button"
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .updateAttributes("image", { width: "25%" })
                  .run()
              }
            >
              25%
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .updateAttributes("image", { width: "50%" })
                  .run()
              }
            >
              50%
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .updateAttributes("image", { width: "100%" })
                  .run()
              }
            >
              100%
            </Button>
          </div>
        );
      })()}

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center" />

      <div className="flex items-center gap-1 px-1 border-r border-slate-300 dark:border-slate-700 mr-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={cn(
                "h-8 gap-1 px-2 font-medium flex items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors",
              )}
            >
              <Type className="h-4 w-4" />
              <span className="text-xs">
                {editor
                  .getAttributes("textStyle")
                  .fontSize?.replace("px", "") || "16"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[60px]">
            {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => (
              <DropdownMenuItem
                key={size}
                className={cn(
                  "text-xs justify-center font-medium",
                  editor.getAttributes("textStyle").fontSize === `${size}px` &&
                    "bg-slate-100 dark:bg-slate-800",
                )}
                onClick={() =>
                  (editor.chain().focus() as any)
                    .setEditorFontSize(`${size}px`)
                    .run()
                }
              >
                {size}px
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className={cn(
                "h-8 gap-1 px-2 font-medium flex items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors",
              )}
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="text-xs">
                {editor.getAttributes("paragraph").lineHeight || "1.2"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[60px]">
            {[1, 1.15, 1.2, 1.5, 2].map((value) => (
              <DropdownMenuItem
                key={value}
                className={cn(
                  "text-xs justify-start font-medium",
                  editor.getAttributes("paragraph").lineHeight ===
                    String(value) && "bg-slate-100 dark:bg-slate-800",
                )}
                onClick={() =>
                  (editor.chain().focus() as any)
                    .setLineHeight(String(value))
                    .run()
                }
              >
                {value}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-1">
        <input
          type="color"
          onInput={(event) =>
            editor
              .chain()
              .focus()
              .setColor((event.target as HTMLInputElement).value)
              .run()
          }
          value={editor.getAttributes("textStyle").color || "#000000"}
          className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer"
          title="Chọn màu chữ"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => editor.chain().focus().unsetColor().run()}
          title="Xóa màu"
        >
          <Type className="h-4 w-4" />
        </Button>
      </div>

      <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1 self-center ml-auto" />

      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>

      <MediaLibraryModal
        isOpen={isMediaModalOpen}
        onOpenChange={setIsMediaModalOpen}
        onSelect={handleImageSelect}
        title="Chọn ảnh cho bài viết"
        folder={folder}
      />
    </div>
  );
};

const CustomTextStyle = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize,
        renderHTML: (attributes) => {
          if (!attributes.fontSize) {
            return {};
          }
          return {
            style: `font-size: ${attributes.fontSize}`,
          };
        },
      },
    };
  },
  addCommands() {
    return {
      setEditorFontSize:
        (fontSize: string) =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetEditorFontSize:
        () =>
        ({ chain }: any) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    } as any;
  },
});

const LineHeight = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "normal",
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ commands }: any) => {
          return this.options.types.every((type: string) =>
            commands.updateAttributes(type, { lineHeight }),
          );
        },
      unsetLineHeight:
        () =>
        ({ commands }: any) => {
          return this.options.types.every((type: string) =>
            commands.resetAttributes(type, "lineHeight"),
          );
        },
    } as any;
  },
});

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "25%",
        renderHTML: (attributes) => {
          return {
            width: attributes.width,
            style: `width: ${attributes.width}; max-width: 100%; height: auto; display: block;`,
          };
        },
        parseHTML: (element) =>
          element.getAttribute("width") || element.style.width,
      },
    };
  },
});

export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  className,
  folder,
}: RichTextEditorProps) => {
  const extensions = useMemo(
    () => [
      StarterKit.configure(),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
      LineHeight,
      CustomTextStyle,
      CustomImage.configure(),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: placeholder || "Bắt đầu soạn thảo...",
      }),
      Color.configure(),
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm dark:prose-invert max-w-none min-h-[200px] p-4 focus:outline-none",
          className,
        ),
      },
    },
  });

  return (
    <div
      className={cn(
        "border rounded-xl overflow-hidden bg-white dark:bg-slate-950 transition-colors flex flex-col max-h-[650px]",
        className,
      )}
    >
      <MenuBar editor={editor} folder={folder} />
      <EditorContent
        editor={editor}
        className="prose prose-sm dark:prose-invert max-w-none min-h-[200px] p-4 focus:outline-none overflow-y-auto flex-1 custom-scrollbar"
      />
      <style jsx global>{`
        .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 0;
          overflow: hidden;
        }
        .ProseMirror table td,
        .ProseMirror table th {
          min-width: 1em;
          border: 1px solid #ced4da;
          padding: 3px 5px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }
        .ProseMirror table th {
          font-weight: bold;
          text-align: left;
          background-color: #f8f9fa;
        }
        .dark .ProseMirror table td,
        .dark .ProseMirror table th {
          border: 1px solid #475569;
        }
        .dark .ProseMirror table th {
          background-color: #1e293b;
        }
        .ProseMirror ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin: 0.5rem 0 !important;
        }
        .ProseMirror ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
          margin: 0.5rem 0 !important;
        }
        .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 1rem 0;
          border-radius: 0.375rem;
          transition: all 0.2s;
        }
        .ProseMirror img.ProseMirror-selectednode {
          outline: 3px solid #3b82f6;
          box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.1);
        }
        .ProseMirror img[style*="text-align: center"] {
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .ProseMirror img[style*="text-align: right"] {
          margin-left: auto !important;
          margin-right: 0 !important;
        }
        .ProseMirror img[style*="text-align: left"] {
          margin-left: 0 !important;
          margin-right: auto !important;
        }
        .ProseMirror [style*="text-align: center"] {
          text-align: center !important;
        }
        .ProseMirror [style*="text-align: right"] {
          text-align: right !important;
        }
        .ProseMirror [style*="text-align: left"] {
          text-align: left !important;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #adb5bd;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
};
