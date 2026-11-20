import React from 'react';

export interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function MathView({ math, block = false, className = '' }: MathViewProps) {
  const [rendered, setRendered] = React.useState<string>(() => {
    if (typeof window !== 'undefined' && (window as any).katex) {
      try {
        return (window as any).katex.renderToString(math, { displayMode: block, throwOnError: false });
      } catch {
        return math;
      }
    }
    return math;
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const k = (window as any).katex;
      if (k) {
        try {
          setRendered(k.renderToString(math, { displayMode: block, throwOnError: false }));
        } catch {
          setRendered(math);
        }
      }
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`my-2 overflow-x-auto py-1 text-text-primary font-mono text-sm ${className}`}
        dangerouslySetInnerHTML={{ __html: rendered }}
      />
    );
  }

  return (
    <span
      className={`inline-block align-baseline mx-0.5 text-text-primary font-mono text-sm ${className}`}
      dangerouslySetInnerHTML={{ __html: rendered }}
    />
  );
}
