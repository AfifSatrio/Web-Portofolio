export function ProjectSkeleton() {
  return (
    <div
      aria-hidden="true"
      data-project-skeleton
      className="surface-panel overflow-hidden h-full"
    >
      <div className="skeleton aspect-video w-full rounded-none" />
      <div className="p-6 space-y-5">
        <div className="space-y-2">
          <div className="skeleton h-6 w-5/6" />
          <div className="skeleton h-6 w-2/3" />
        </div>
        <div className="space-y-2">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-7 w-20 rounded-full" />
          <div className="skeleton h-7 w-24 rounded-full" />
        </div>
        <div className="skeleton h-11 w-full" />
      </div>
    </div>
  );
}
