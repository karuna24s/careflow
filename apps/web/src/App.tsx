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

        {/* Documentation / "How to Test" Section */}
        <section className="mt-16 max-w-2xl mx-auto border-t border-slate-200 pt-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
            Verification Steps
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <span className="text-blue-600 font-bold mb-2 block">01. Shared Logic</span>
              <p className="text-sm text-slate-600">
                Select <strong>Childcare</strong> and leave Household Size empty.
                The error message is defined once in <code>packages/shared</code>.
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
              <span className="text-blue-600 font-bold mb-2 block">02. Type Safety</span>
              <p className="text-sm text-slate-600">
                The form is strictly typed using <code>PatientIntake</code>, ensuring
                data integrity from input to API.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 text-center text-slate-400 text-sm">
          Built with React 19, Vite 7, and Zod v4.
        </footer>
      </div>
    </div>
  );
}

export default App;