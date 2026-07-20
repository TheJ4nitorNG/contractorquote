import { QuoteProvider } from "@/context/QuoteContext";
import { QuoteBuilder } from "@/components/quote/QuoteBuilder";

export default function Home() {
  return (
    <QuoteProvider>
      <div className="min-h-screen bg-gray-50/50 print:bg-white text-black">
        <header className="bg-white border-b sticky top-0 z-40 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-xl font-bold text-gray-900">Contractor Quote Generator</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <QuoteBuilder />
        </main>
      </div>
    </QuoteProvider>
  );
}
