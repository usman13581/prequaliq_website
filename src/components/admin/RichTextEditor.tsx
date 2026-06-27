"use client";

import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Link as LinkIcon,
  ImagePlus,
  Quote,
} from "lucide-react";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  onInsertImage?: () => void;
  disabled?: boolean;
};

export function RichTextEditor({ value, onChange, onInsertImage, disabled }: RichTextEditorProps) {
  function exec(command: string, valueArg?: string) {
    document.execCommand(command, false, valueArg);
    const editor = document.getElementById("blog-rich-editor");
    if (editor) onChange(editor.innerHTML);
  }

  function handleInput() {
    const editor = document.getElementById("blog-rich-editor");
    if (editor) onChange(editor.innerHTML);
  }

  function addLink() {
    const url = window.prompt("Link URL (https://…)");
    if (url) exec("createLink", url);
  }

  const btn =
    "h-9 w-9 flex items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-foreground hover:bg-surface transition-colors disabled:opacity-50";

  return (
    <div className="rounded-xl border border-border overflow-hidden bg-card">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-surface">
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("bold")} title="Bold">
          <Bold className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("italic")} title="Italic">
          <Italic className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("underline")} title="Underline">
          <Underline className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("formatBlock", "h2")} title="Heading 2">
          <Heading2 className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("formatBlock", "h3")} title="Heading 3">
          <Heading3 className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("insertUnorderedList")} title="Bullet list">
          <List className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("insertOrderedList")} title="Numbered list">
          <ListOrdered className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={() => exec("formatBlock", "blockquote")} title="Quote">
          <Quote className="w-4 h-4" />
        </button>
        <button type="button" className={btn} disabled={disabled} onClick={addLink} title="Link">
          <LinkIcon className="w-4 h-4" />
        </button>
        {onInsertImage && (
          <button type="button" className={btn} disabled={disabled} onClick={onInsertImage} title="Insert image">
            <ImagePlus className="w-4 h-4" />
          </button>
        )}
      </div>
      <div
        id="blog-rich-editor"
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-[280px] max-h-[480px] overflow-y-auto px-4 py-4 text-sm leading-relaxed text-foreground focus:outline-none prose prose-sm max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-semibold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic [&_img]:rounded-xl [&_img]:my-4"
      />
    </div>
  );
}
