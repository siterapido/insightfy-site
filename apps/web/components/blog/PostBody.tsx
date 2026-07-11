import type { ReactNode } from "react";

export function PostBody({ children }: { children: ReactNode }) {
  return (
    <div className="prose-blog mx-auto w-full max-w-[72ch] pt-10">{children}</div>
  );
}
