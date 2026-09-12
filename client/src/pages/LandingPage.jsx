import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-base text-white" aria-hidden="true">☾</span>
          <span>Weird Dreams</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium">
          <a href="#features" className="hidden text-muted hover:text-ink sm:block">Features</a>
          <a href="#how" className="hidden text-muted hover:text-ink sm:block">How it works</a>
          {isAuthenticated ? (
            <Link to="/dreams" className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Open journal</Link>
          ) : (
            <>
              <Link to="/login" className="text-muted hover:text-ink">Sign in</Link>
              <Link to="/signup" className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Get started</Link>
            </>
          )}
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-accent">Private dream journal · AI interpretations</p>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Write down the night.<br />Understand the morning.
          </h1>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
            Weird Dreams is a calm, private space to log your dreams, track emotions
            and symbols, and get thoughtful AI interpretations.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dreams" className="rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">Open journal</Link>
                <Link to="/add-dream" className="rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-slate-300">+ Log a dream</Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700">Start journaling — free</Link>
                <Link to="/login" className="rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-slate-300">Sign in</Link>
              </>
            )}
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <dt className="text-sm font-bold">Private</dt>
              <dd className="mt-1 text-xs text-muted">Only you see your dreams</dd>
            </div>
            <div>
              <dt className="text-sm font-bold">AI insight</dt>
              <dd className="mt-1 text-xs text-muted">Summary + interpretation</dd>
            </div>
            <div>
              <dt className="text-sm font-bold">Any device</dt>
              <dd className="mt-1 text-xs text-muted">Clean on mobile & desktop</dd>
            </div>
          </dl>
        </div>

        <aside className="rounded-2xl border border-line bg-white p-6 shadow-sm" aria-hidden="true">
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="ml-3 text-xs font-semibold uppercase tracking-wider text-muted">Last night</span>
          </div>
          <p className="text-lg font-semibold leading-snug">“Flying over a glowing city, calm and weightless…”</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">calm</span>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">happy</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-muted">lucid</span>
          </div>
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-accent">AI interpretation</p>
            <p className="text-sm leading-relaxed text-slate-600">
              Flying often reflects a desire for freedom and perspective. The calm tone
              suggests you are processing change with confidence.
            </p>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="features">
        <h2 className="mb-7 text-2xl font-bold tracking-tight sm:text-3xl">Everything you need, nothing noisy</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-base" aria-hidden="true">✎</span>
            <h3 className="text-base font-bold">Fast logging</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">Title, story, emotions, tags, lucid / nightmare / recurring — saved in seconds.</p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-base" aria-hidden="true">◐</span>
            <h3 className="text-base font-bold">Emotion tracking</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">Tag how each dream felt and notice the patterns that keep returning.</p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-base" aria-hidden="true">✦</span>
            <h3 className="text-base font-bold">AI interpretations</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">One tap gives you a short summary plus a deeper symbolic reading.</p>
          </article>
          <article className="rounded-2xl border border-line bg-white p-6">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-base" aria-hidden="true">🔒</span>
            <h3 className="text-base font-bold">Private by default</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">JWT-secured journal. Your dreams are yours — edit or delete anytime.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" id="how">
        <h2 className="mb-7 text-2xl font-bold tracking-tight sm:text-3xl">Three steps, one minute</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-line bg-white p-6">
            <strong className="block text-base font-bold">1 — Capture</strong>
            <span className="mt-1 block text-sm text-muted">Write it before it fades.</span>
          </li>
          <li className="rounded-2xl border border-line bg-white p-6">
            <strong className="block text-base font-bold">2 — Tag</strong>
            <span className="mt-1 block text-sm text-muted">Emotions, symbols, themes.</span>
          </li>
          <li className="rounded-2xl border border-line bg-white p-6">
            <strong className="block text-base font-bold">3 — Reflect</strong>
            <span className="mt-1 block text-sm text-muted">Read the AI take, keep what resonates.</span>
          </li>
        </ol>
        <div className="mt-8">
          {isAuthenticated ? (
            <Link to="/add-dream" className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700">Log tonight's dream</Link>
          ) : (
            <Link to="/signup" className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-violet-700">Create your journal</Link>
          )}
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-5 border-t border-line px-4 py-8 sm:flex-row sm:items-center sm:px-6">
        <Link to="/" className="text-base font-bold">Weird Dreams<span className="text-accent">.</span></Link>
        <p className="text-sm text-muted">For the thoughts that arrive after dark.</p>
        <div className="flex gap-5 text-sm">
          {isAuthenticated ? (
            <>
              <Link to="/dreams" className="text-muted hover:text-ink">My dreams</Link>
              <Link to="/add-dream" className="text-muted hover:text-ink">Log a dream</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-muted hover:text-ink">Log in</Link>
              <Link to="/signup" className="text-muted hover:text-ink">Create an account</Link>
            </>
          )}
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;