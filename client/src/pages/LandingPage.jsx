import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import background1 from '../assets/background1.png';
import './LandingPage.css';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const { isAuthenticated } = useAuth();
  const introProgress = Math.min(Math.max((scrollY - 360) / 620, 0), 1);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="landing-page">
      <section className="dream-hero">
        <nav className="landing-nav">
          <Link to="/" className="landing-brand">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span>WEIRD DREAMS</span>
          </Link>
          <div className="landing-nav-links">
            <Link to="/">Home</Link>
            <a href="#journal">About</a>
            <a href="#footer">Contact</a>
            {isAuthenticated ? (
              <Link to="/dreams" className="landing-sign-in">My Dreams</Link>
            ) : (
              <Link to="/login" className="landing-sign-in">Sign in</Link>
            )}
          </div>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">A private place for impossible nights</p>
          <h1>WEIRD<br />DREAMS</h1>
          <h2>Creative journaling for your subconscious</h2>
          <p className="hero-description">
            Capture the worlds that visit you after dark. Write freely, collect the details,
            and discover the patterns hiding inside your dreams.
          </p>
          <div className="hero-actions">
            {isAuthenticated ? (
              <>
                <Link to="/dreams" className="primary-action">Open journal</Link>
                <Link to="/add-dream" className="text-action">Log a dream <span aria-hidden="true">-&gt;</span></Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="primary-action">Try now</Link>
                <a href="#journal" className="text-action">Learn more <span aria-hidden="true">-&gt;</span></a>
              </>
            )}
          </div>
        </div>

        <div className="cloud-field" aria-hidden="true">
          <div className="cloud-layer cloud-layer-back" style={{ '--scroll-x': scrollY * -0.06, '--scroll-y': scrollY * 0.12 }}>
            <i className="cloud-shape cloud-shape-a" />
            <i className="cloud-shape cloud-shape-b" />
            <i className="cloud-shape cloud-shape-g" />
            <i className="cloud-shape cloud-shape-h" />
          </div>
          <div className="cloud-layer cloud-layer-mid" style={{ '--scroll-x': scrollY * -0.14, '--scroll-y': scrollY * 0.24 }}>
            <i className="cloud-shape cloud-shape-c" />
            <i className="cloud-shape cloud-shape-d" />
            <i className="cloud-shape cloud-shape-i" />
            <i className="cloud-shape cloud-shape-j" />
          </div>
          <div className="cloud-layer cloud-layer-front" style={{ '--scroll-x': scrollY * -0.24, '--scroll-y': scrollY * 0.4 }}>
            <i className="cloud-shape cloud-shape-e" />
            <i className="cloud-shape cloud-shape-f" />
            <i className="cloud-shape cloud-shape-k" />
            <i className="cloud-shape cloud-shape-l" />
          </div>
        </div>

        <div className="hero-scroll-cue" style={{ opacity: Math.max(0, 1 - scrollY / 180) }} aria-hidden="true">
          <span />
          Scroll to descend
        </div>
      </section>

      <section
        className="journal-intro"
        id="journal"
        style={{
          '--bridge-scale': 1 + introProgress * 1.8,
          '--bridge-y': `${introProgress * -90}px`,
        }}
      >
        <div className="cloud-bridge" aria-hidden="true">
          <div className="bridge-cloud bridge-cloud-one" />
          <div className="bridge-cloud bridge-cloud-two" />
          <div className="bridge-cloud bridge-cloud-three" />
        </div>
        <div className="intro-orbit" aria-hidden="true">
          <img src={background1} alt="" />
        </div>
        <div className="intro-content">
          <p className="eyebrow eyebrow-dark">The morning after</p>
          <h2>Somewhere between memory and myth.</h2>
          <p>
            Weird Dreams is a quiet, beautifully organized home for the worlds your mind
            makes while you sleep. Keep the details, the mood, and the recurring symbols
            in one place, then come back when you are ready to look closer.
          </p>
          <Link to="/signup" className="dark-action">Enter the journal <span aria-hidden="true">-&gt;</span></Link>
        </div>
        <div className="intro-note">
          <span className="note-mark">01</span>
          <p>Write it down<br />before it fades.</p>
        </div>
      </section>

      <section className="ritual-section">
        <div className="ritual-heading">
          <p className="eyebrow eyebrow-dark">A small nightly ritual</p>
          <h2>Make room for<br /><em>the unusual.</em></h2>
        </div>
        <div className="ritual-grid">
          <article>
            <span>01</span>
            <h3>Capture the feeling</h3>
            <p>Save the fragments that stay with you: a color, a face, a place, a feeling.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Find your patterns</h3>
            <p>Tag recurring themes and watch your private dream vocabulary take shape.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Look a little closer</h3>
            <p>Ask the AI companion for a thoughtful interpretation, never a final answer.</p>
          </article>
        </div>
      </section>

      <footer className="landing-footer" id="footer">
        <Link to="/" className="footer-brand">Weird Dreams<span>.</span></Link>
        <p>For the thoughts that arrive after dark.</p>
        <div className="footer-links">
          {isAuthenticated ? (
            <>
              <Link to="/dreams">My dreams</Link>
              <Link to="/add-dream">Log a dream</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Create an account</Link>
            </>
          )}
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
