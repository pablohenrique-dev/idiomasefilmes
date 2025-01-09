"use client";

import { useEditorStore } from "@/store/use-editor";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorToolbar } from "./editor-toolbar";

interface EditorProps {
  content?: string;
  onChange?: (content: string) => void;
}

export function Editor({ content, onChange }: EditorProps) {
  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    extensions: [
      Underline,
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class: "border-t border-[#e5e5e5] py-1 px-3 min-h-[240px]",
      },
    },
    content: content || "",
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  });

  return (
    <div className="rounded border border-[#e5e5e5]">
      <EditorToolbar />
      <EditorContent editor={editor} />
    </div>
  );
}
