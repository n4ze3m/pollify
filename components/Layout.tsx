import { JSX } from "preact";
import IconBrandGithub from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/brand-github.tsx";

type LayoutProps = {
  children: JSX.Element | JSX.Element[];
};

function Layout({ children }: LayoutProps) {
  return (
    <div class={"min-h-screen flex flex-col"}>
     <header class={"bg-white border-b border-gray-200"}>
      <div class={"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center"}>
        <a
        href={"/"}
        class={"text-lg font-bold text-gray-900"}>
          Pollify {' '}
          <span role="img" aria-label="bar chart">
          📊
          </span>
        </a>
        <a
          href="https://github.com/n4ze3m/pollify"
          target="_blank"
          rel="noopener noreferrer"
          class={"text-gray-500 hover:text-gray-700"}
        >
          <IconBrandGithub className={"w-6 h-6"} />
        </a>
      </div>
    </header>
      <main class={"flex-grow"}>{children}</main>
      <footer>
        <div className="flex justify-end p-4">
          <a href="https://fresh.deno.dev" className="bottom-0 right-0">
            <img
              width="197"
              height="37"
              src="https://fresh.deno.dev/fresh-badge.svg"
              alt="Made with Fresh"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
