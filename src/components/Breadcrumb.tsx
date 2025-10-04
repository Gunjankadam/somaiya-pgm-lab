import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getPageName = (path: string) => {
    const names: Record<string, string> = {
      about: "About PGM",
      objectives: "Module Objectives",
      theory: "Theory Section",
      experiments: "List of Experiments",
      "bayes-server": "Bayes Server",
      papers: "Papers",
      feedback: "Feedback",
      projects: "Projects",
    };
    return names[path] || path;
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="bg-muted/50 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          </li>
          {pathnames.map((path, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <li key={path} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {isLast ? (
                  <span className="font-medium text-foreground">{getPageName(path)}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {getPageName(path)}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
