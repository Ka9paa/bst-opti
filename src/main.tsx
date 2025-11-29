import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/styles/globals.css';

console.log('🔥 main.tsx loaded!');
console.log('📦 App imported:', App);

const rootElement = document.getElementById('root');
console.log('🎯 Root element:', rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log('✅ React rendered!');
} else {
  console.error('❌ Root element not found!');
}
