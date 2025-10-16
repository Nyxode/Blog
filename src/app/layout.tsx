import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import Footer from "@/app/_components/footer";
import "./globals.css";
import "./zenn-content.css"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FUKAGAWA.dev",
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
      <body
        className={cn(
          inter.className,
          "bg-[#f3f8fb] text-gray-900 dark:bg-slate-900 dark:text-slate-400 flex flex-col min-h-screen"
        )}
      >
        {/* ページ本体 */}
        <main className="flex-grow">{children}</main>

        {/* フッターを独立した白背景の帯にする */}
        <footer className="bg-white border-t border-gray-200 dark:border-gray-700 py-10 text-center text-sm text-gray-500 dark:text-gray-400">
          Built with{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Next.js
          </a>{" "}
          ×{" "}
          <a
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            Tailwind CSS
          </a>
        </footer>
      </body>
    </html>
  );
}
