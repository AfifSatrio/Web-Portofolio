import { ToolIcon, ToolType } from "./ToolIcon";
export interface ToolItem {
  id: string;
  name: string;
  type: ToolType;
}
export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <div className="surface-panel p-4 flex flex-col items-center justify-center gap-3 h-full">
      <ToolIcon name={tool.type} className="w-7 h-7 text-ink-secondary" />
      <span className="text-xs text-center text-ink-secondary">
        {tool.name}
      </span>
    </div>
  );
}
