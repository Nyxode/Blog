export default function Footer() {
  return (
    <footer className="bg-white pt-10 pb-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
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
  );
}
