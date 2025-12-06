import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SignLang Academy - Learn Sign Language',
  description: 'Master sign language with interactive lessons and evaluations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }

          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}</style>
      </head>
      <body>
        <header style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem 2rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}>
          <nav style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem' }}>🤟</span>
              <h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '-0.5px' }}>
                SignLang<span style={{ color: '#a8e6cf' }}>Academy</span>
              </h1>
            </div>
          </nav>
        </header>
        <main style={{ 
          flex: 1, 
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          borderRadius: '0',
        }}>
          {children}
        </main>
      </body>
    </html>
  );
}
