import ChatWidget from "../components/navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold text-lg">Spur AI</h1>
          <nav className="space-x-4 text-sm text-slate-600">
            <a href="#">Home</a>
            <a href="#">Pricing</a>
            <a href="#">Docs</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold">AI-powered Customer Support</h2>
          <p className="text-slate-600">
            Spur helps businesses automate customer support using AI agents
            across chat platforms. Try the live demo on the right.
          </p>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Why Spur?</h3>
            <ul className="list-disc ml-5 text-slate-600 space-y-1">
              <li>Instant AI replies</li>
              <li>Conversation history</li>
              <li>Human handoff ready</li>
              <li>Scalable architecture</li>
            </ul>
          </div>
        </section>

        <aside className="bg-white rounded-xl shadow-lg h-[600px]">
          <ChatWidget />
        </aside>
      </main>

      <footer className="border-t text-center text-sm text-slate-500 py-4">
        © 2025 Spur AI Demo
      </footer>
    </div>
  );
}
