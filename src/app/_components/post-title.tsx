import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-snug text-gray-900 dark:text-gray-100 mb-6">
      {children}
    </h1>
  );
}
