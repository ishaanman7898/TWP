import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // Show loader for minimum 300ms for smooth transition

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
