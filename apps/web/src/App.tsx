import { IntakeForm } from './components/IntakeForm';
import './App.css';

/**
 * CareFlow Main Application Entry
 * * This component acts as a shell for the Shared-Contract demo.
 * The core logic is handled within the IntakeForm, which consumes
 * validation rules directly from @careflow/shared.
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            Monorepo Architecture Demo
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-4">
            CareFlow <span className="text-blue-600">Sync</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A "Source of Truth" system where Frontend and Backend
            validation are governed by a single shared Zod contract.
          </p>
        </header>

        {/* Main Demo Section */}
        <main className="relative">
          <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10 transform translate-y-12"></div>
          <IntakeForm />
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-400 text-sm">
          Built with React 19, Vite 7, and Zod v4.
        </footer>
      </div>
    </div>
  );
}

export default App;