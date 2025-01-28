interface ScriptProps {
  script: string;
}

export function Script({ script }: ScriptProps) {
  return (
    <div
      className="mt-8 rounded border px-5 py-2"
      dangerouslySetInnerHTML={{ __html: script }}
    ></div>
  );
}
