import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-orange-900">
      <AlertTriangle className="w-24 h-24 text-orange-500 mb-8 animate-bounce" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Oops! Page not found</h2>
      <p className="text-lg mb-8 text-center max-w-md">
        We couldn't find the page you're looking for. It might have been moved
        or doesn't exist.
      </p>
      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
