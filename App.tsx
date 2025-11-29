console.log('🚀 App.tsx FILE LOADED');

function App() {
  console.log('🎯 App FUNCTION CALLED');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
        ⚡ AXIRA OPTIMIZER ⚡
      </h1>
      <p style={{ fontSize: '24px', marginBottom: '40px', opacity: 0.8 }}>
        React is working!
      </p>
      <div style={{ 
        background: 'rgba(0, 123, 255, 0.2)', 
        border: '2px solid #007bff',
        borderRadius: '12px',
        padding: '30px',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '18px', marginBottom: '15px' }}>
          ✅ Vite Build: OK
        </p>
        <p style={{ fontSize: '18px', marginBottom: '15px' }}>
          ✅ React Rendering: OK
        </p>
        <p style={{ fontSize: '18px', marginBottom: '15px' }}>
          ✅ Vercel Deploy: OK
        </p>
        <p style={{ fontSize: '14px', marginTop: '20px', opacity: 0.6 }}>
          If you see this, your setup is working correctly!
        </p>
      </div>
    </div>
  );
}

console.log('📦 App EXPORT:', App);

export default App;
