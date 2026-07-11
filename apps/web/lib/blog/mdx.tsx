import type { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { CtaInline } from "@/components/blog/CtaInline";
import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/types";
import { contactPath } from "./posts";

export function createMdxComponents(
  dict: Dictionary["blog"],
  locale: Locale,
): MDXComponents {
  function BoundCtaInline() {
    return (
      <CtaInline
        title={dict.ctaInline.title}
        body={dict.ctaInline.body}
        cta={dict.ctaInline.cta}
        href={contactPath(locale)}
      />
    );
  }

  return {
    CtaInline: BoundCtaInline,
    h2: (props) => (
      <h2
        className="mt-12 scroll-mt-24 font-display text-2xl font-semibold tracking-tight text-text first:mt-0 sm:text-3xl"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 scroll-mt-24 font-display text-xl font-semibold tracking-tight text-text"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-5 text-base leading-[1.75] text-muted first:mt-0" {...props} />
    ),
    a: (props) => (
      <a
        className="font-medium text-accent underline-offset-4 transition-colors hover:underline"
        {...props}
      />
    ),
    ul: (props) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-muted marker:text-accent/70" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-muted marker:text-accent/70" {...props} />
    ),
    li: (props) => <li className="leading-[1.7] pl-1" {...props} />,
    strong: (props) => <strong className="font-semibold text-text" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-6 border border-border bg-surface/60 px-5 py-4 text-muted italic"
        {...props}
      />
    ),
    code: ({ children, className, ...props }: { children?: ReactNode; className?: string }) => {
      const isBlock = Boolean(className);
      if (isBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent"
          {...props}
        >
          {children}
        </code>
      );
    },
    pre: (props) => (
      <pre
        className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-relaxed text-text shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
  };
}

export async function renderPostMdx(
  source: string,
  dict: Dictionary["blog"],
  locale: Locale,
) {
  const components = createMdxComponents(dict, locale);
  return <MDXRemote source={source} components={components} />;
}
