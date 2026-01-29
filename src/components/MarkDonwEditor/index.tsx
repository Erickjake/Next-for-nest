import dynamic from "next/dynamic";
import { useId } from "react";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

type MarkDownEditorProps = {
  labelText?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textAreaName: string;
  disabled?: boolean;
}
export function MarkDownEditor(props: MarkDownEditorProps) {
  const { labelText = '', value, setValue, textAreaName, disabled } = props;
  const id = useId();

  return (
    <div className="flex flex-col">
      {labelText && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {labelText}
        </label>
      )}
      <MDEditor
        className="whitespace-pre-wrap"
        value={value}
        onChange={value => {
          if (value === undefined) return
          setValue(value);
        }}
        height={400}
        extraCommands={[]}
        preview="edit"
        hideToolbar={disabled}
        textareaProps={{
          name: textAreaName,
          id: id,
          disabled: disabled,
        }}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
          remarkPlugins: [[remarkGfm]]
        }}
      />
    </div>
  )
}
