import { useMemo, useState } from "react";
import {
  createEditor,
  Descendant,
  Editor,
  BaseEditor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { Slate, Editable, withReact, useSlate, ReactEditor } from "slate-react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaQuoteLeft,
  FaCode,
  FaHeading,
} from "react-icons/fa";

// Define Custom Element Types
type CustomElement = { type: string; children: CustomText[] };
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type MarkFormat = keyof Omit<CustomText, "text">;
type BlockFormat = "blockquote" | "heading-one";
type Format = MarkFormat | BlockFormat;

// Extend Slate Custom Types
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Toolbar Button Component
const ToolbarButton: React.FC<{ format: Format; icon: JSX.Element; block?: boolean }> = ({
  format,
  icon,
  block = false,
}) => {
  const editor = useSlate();
  const isActive = block
    ? isBlockActive(editor, format as BlockFormat)
    : isMarkActive(editor, format as MarkFormat);

  return (
    <button
      onMouseDown={(event) => {
        event.preventDefault();
        block
          ? toggleBlock(editor, format as BlockFormat)
          : toggleMark(editor, format as MarkFormat);
      }}
      className={`mx-1 p-1 text-white rounded hover:bg-neutral-600 ${
        isActive ? "bg-red-400" : "bg-neutral-700"
      }`}
    >
      {icon}
    </button>
  );
};

// Toggle Inline Formatting
const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Check if Inline Mark is Active
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

// Check if Block is Active
const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

// Leaf Rendering for Inline Formatting
const Leaf: React.FC<{ attributes: any; children: any; leaf: CustomText }> = ({
  attributes,
  children,
  leaf,
}) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.strikethrough) children = <del>{children}</del>;
  if (leaf.code)
    children = <code className="bg-neutral-700 p-1 rounded">{children}</code>;
  return <span {...attributes}>{children}</span>;
};

// Element Rendering for Block Formatting
const Element: React.FC<{ attributes: any; children: any; element: CustomElement }> = ({
  attributes,
  children,
  element,
}) => {
  switch (element.type) {
    case "heading-one":
      return (
        <h1 {...attributes} className="text-xl font-bold">
          {children}
        </h1>
      );
    case "blockquote":
      return (
        <blockquote {...attributes} className="border-l-4 pl-4 italic">
          {children}
        </blockquote>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

// Initial Content
const initialValue: CustomElement[] = [
  {
    type: "paragraph",
    children: [{ text: "Start writing your blog here..." }],
  },
];

// Main Rich Text Editor Component
const RichTextEditor: React.FC<{ onChange: (content: Descendant[]) => void }> = ({ onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const handleChange = (newValue: Descendant[]) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="bg-neutral-800 p-4 rounded-lg shadow-md text-white">
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        {/* Toolbar */}
        <div className="flex bg-neutral-700 p-2 rounded-md mb-2">
          <ToolbarButton format="bold" icon={<FaBold />} />
          <ToolbarButton format="italic" icon={<FaItalic />} />
          <ToolbarButton format="underline" icon={<FaUnderline />} />
          <ToolbarButton format="strikethrough" icon={<FaStrikethrough />} />
          <ToolbarButton format="code" icon={<FaCode />} />
          <ToolbarButton format="blockquote" icon={<FaQuoteLeft />} block />
          <ToolbarButton format="heading-one" icon={<FaHeading />} block />
        </div>

        {/* Editable Content */}
        <Editable
          className="p-3 bg-neutral-700 rounded-md max-h-[200px] min-h-[200px] max-w-5xl w-full overflow-auto focus:outline-none"
          placeholder="Write your blog post..."
          renderLeaf={(props) => <Leaf {...props} />}
          renderElement={(props) => <Element {...props} />}
        />
      </Slate>
    </div>
  );
};

export default RichTextEditor;
