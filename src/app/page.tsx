import { QuoteProvider } from "@/context/QuoteContext";
import { QuoteBuilder } from "@/components/quote/QuoteBuilder";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <QuoteProvider>
      <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 print:bg-white text-black dark:text-white">
        <header className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 sticky top-0 z-40 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Contractor Quote Generator</h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuoteBuilder />
        </main>
      </div>
    </QuoteProvider>
  );
}
