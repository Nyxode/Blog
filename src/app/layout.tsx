import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import Footer from "@/app/_components/footer";
import "./globals.css";
import "./zenn-content.css"; // ← ✨これを追加！

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "A statically generated blog built with Next.js and Tailwind CSS",
  metadataBase: new URL("http://localhost:3000"), 
};

const themeScript = `
  (function() {
    try {
      const STORAGE_KEY = 'nextjs-blog-starter-theme';
      const DARK = 'dark';
      const LIGHT = 'light';
      const SYSTEM = 'system';
      const media = matchMedia('(prefers-color-scheme: dark)');
      const mode = localStorage.getItem(STORAGE_KEY) ?? SYSTEM;
      const systemMode = media.matches ? DARK : LIGHT;
      const resolved = mode === SYSTEM ? systemMode : mode;
      const classList = document.documentElement.classList;
      if (resolved === DARK) classList.add(DARK);
      else classList.remove(DARK);
      document.documentElement.setAttribute('data-mode', mode);
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}>
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
