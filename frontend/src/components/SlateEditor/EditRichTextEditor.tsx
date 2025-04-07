import { useMemo, useEffect, useCallback } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaQuoteLeft,
  FaHeading,
} from "react-icons/fa";

// Define Custom Element Types
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

type MarkFormat = keyof Omit<CustomText, "text">;
type BlockFormat = "blockquote" | "heading-one";
type Format = MarkFormat | BlockFormat;

declare module "slate" {
  interface CustomTypes {
    Editor: Editor & ReactEditor;
  }
}

// Toolbar Button Component
const ToolbarButton: React.FC<{
  format: Format;
  icon: JSX.Element;
  block?: boolean;
}> = ({ format, icon, block = false }) => {
  const editor = useSlate();
  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        block
          ? toggleBlock(editor, format as BlockFormat)
          : toggleMark(editor, format as MarkFormat);
      }}
      className="mx-1 p-2 text-white rounded-md hover:bg-neutral-600 bg-neutral-700"
    >
      {icon}
    </button>
  );
};

// Toggle Inline Formatting
const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);
  isActive
    ? Editor.removeMark(editor, format)
    : Editor.addMark(editor, format, true);
};

const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Toggle Block Formatting
const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const newType = isActive ? "paragraph" : format;
  Transforms.setNodes(editor, { type: newType } as Partial<SlateElement>);
};

const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "heading-one":
      return (
        <h1 {...attributes} className="text-xl font-bold text-white">
          {children}
        </h1>
      );
    case "blockquote":
      return (
        <blockquote {...attributes} className="border-l-4 pl-4 italic text-white">
          {children}
        </blockquote>
      );
    default:
      return <p {...attributes} className="text-white">{children}</p>;
  }
};

// **Fixed Rich Text Editor**
const EditRichTextEditor: React.FC<{
  value: Descendant[];
  onChange: (content: Descendant[]) => void;
}> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    if (editor.children !== value) {
      Transforms.deselect(editor);
      editor.children = value;
      editor.onChange();
    }
  }, [value, editor]);

  const handleChange = useCallback(
    (newValue: Descendant[]) => {
      onChange(newValue);
    },
    [onChange]
  );

  return (
    <Slate editor={editor} initialValue={value} onChange={handleChange}>
      {/* Toolbar */}
      <div className="flex bg-neutral-700 p-2 rounded-md mb-4">
        <ToolbarButton format="bold" icon={<FaBold />} />
        <ToolbarButton format="italic" icon={<FaItalic />} />
        <ToolbarButton format="underline" icon={<FaUnderline />} />
        <ToolbarButton format="strikethrough" icon={<FaStrikethrough />} />
        <ToolbarButton format="heading-one" icon={<FaHeading />} block />
        <ToolbarButton format="blockquote" icon={<FaQuoteLeft />} block />
      </div>

      {/* Editor */}
      <Editable
        placeholder="Write your blog post..."
        renderLeaf={(props) => <Leaf {...props} />}
        renderElement={(props) => <Element {...props} />}
        className="p-3 bg-neutral-700 rounded-md max-h-[200px] min-h-[200px] max-w-5xl w-full overflow-auto focus:outline-none"
        />
    </Slate>
  );
};

export default EditRichTextEditor;
