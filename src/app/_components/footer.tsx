import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200">
            Built with Next.js × Tailwind CSS
          </h3>

          <div className="mt-6 lg:mt-0 flex flex-col lg:flex-row items-center gap-4">
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 bg-black hover:bg-white hover:text-black border border-black text-white font-semibold py-2 px-6 rounded duration-200 transition-colors"
            >
              Next.js Docs
            </a>

            <a
              href="https://github.com/Nyxode/Blog"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} Blog. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
