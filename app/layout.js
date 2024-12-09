// app/layout.js
import Layout from './components/Layout';  // Adjust the path if needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
