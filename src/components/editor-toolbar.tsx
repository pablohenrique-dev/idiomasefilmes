import { useEditorStore } from "@/lib/tiptap/use-editor";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1,
  Heading2,
  Heading3,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  LucideIcon,
  QuoteIcon,
  Redo2Icon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { ToolbarButton } from "./toolbar-button";
import { Separator } from "./ui/separator";

export function EditorToolbar() {
  const { editor } = useEditorStore();

  const tools: {
    label: string;
    icon: LucideIcon;
    handleClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Bold",
        icon: BoldIcon,
        handleClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        handleClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        handleClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Align Left",
        handleClick: () => editor?.chain().focus().setTextAlign("left").run(),
        icon: AlignLeftIcon,
        isActive: editor?.isActive({ textAlign: "left" }),
      },
      {
        label: "Align Center",
        handleClick: () => editor?.chain().focus().setTextAlign("center").run(),
        icon: AlignCenterIcon,
        isActive: editor?.isActive({ textAlign: "center" }),
      },
      {
        label: "Align Right",
        handleClick: () => editor?.chain().focus().setTextAlign("right").run(),
        icon: AlignRightIcon,
        isActive: editor?.isActive({ textAlign: "right" }),
      },
      {
        label: "Justify",
        handleClick: () =>
          editor?.chain().focus().setTextAlign("justify").run(),
        icon: AlignJustifyIcon,
        isActive: editor?.isActive({ textAlign: "justify" }),
      },
    ],
    [
      {
        label: "Heading 1",
        handleClick: () =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run(),
        icon: Heading1,
        isActive: editor?.isActive("heading", { level: 1 }),
      },
      {
        label: "Heading 2",
        handleClick: () =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        icon: Heading2,
        isActive: editor?.isActive("heading", { level: 2 }),
      },
      {
        label: "Heading 3",
        handleClick: () =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        icon: Heading3,
        isActive: editor?.isActive("heading", { level: 3 }),
      },
    ],
    [
      {
        label: "Ordered List",
        handleClick: () => editor?.chain().focus().toggleOrderedList().run(),
        icon: ListOrderedIcon,
        isActive: editor?.isActive("orderedList"),
      },
      {
        label: "Unordered List",
        handleClick: () => editor?.chain().focus().toggleBulletList().run(),
        icon: ListIcon,
        isActive: editor?.isActive("bulletList"),
      },
      {
        label: "Blockquote",
        handleClick: () => editor?.chain().focus().toggleBlockquote().run(),
        icon: QuoteIcon,
        isActive: editor?.isActive("blockquote"),
      },
    ],
    [
      {
        label: "Undo",
        handleClick: () => editor?.chain().focus().undo().run(),
        icon: Undo2Icon,
      },
      {
        label: "Redo",
        handleClick: () => editor?.chain().focus().redo().run(),
        icon: Redo2Icon,
      },
    ],
  ];

  return (
    <div className="flex w-fit flex-wrap items-center gap-2 p-2">
      {tools[0].map((tool) => {
        return <ToolbarButton key={tool.label} title={tool.label} {...tool} />;
      })}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {tools[1].map((tool) => {
        return <ToolbarButton key={tool.label} title={tool.label} {...tool} />;
      })}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {tools[2].map((tool) => {
        return <ToolbarButton key={tool.label} title={tool.label} {...tool} />;
      })}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {tools[3].map((tool) => {
        return <ToolbarButton key={tool.label} title={tool.label} {...tool} />;
      })}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {tools[4].map((tool) => {
        return <ToolbarButton key={tool.label} title={tool.label} {...tool} />;
      })}
    </div>
  );
}
