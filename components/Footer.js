import { Coffee } from "lucide-react";
import Link from "next/link";


export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-dark-lighter" />
          <span className="text-dark-lighter font-medium">
            FuelMyWork © {currentYear}
          </span>
        </div>

        <div className="flex gap-6 text-sm text-dark-lighter">
          <Link href="/terms" className="hover:text-dark transition-colors">
            Terms & Privacy
          </Link>

          <a
            href="https://github.com/maruthu04/fuel-my-work"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-dark transition-colors"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}
