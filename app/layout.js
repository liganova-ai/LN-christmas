import styles from './globals.css'; 
import localFont from 'next/font/local'; 


const luxury = localFont({
  src: [
    {
      path: '/fonts/Luxury-Diamond.otf',
      weight: '300',
      style: 'diamond',
    },
    {
      path: '/fonts/Luxury-Gold.otf',
      weight: '200',
      style: 'golden',
    },
    {
      path: '/fonts/Luxury-Platinum.otf',
      weight: '700',
      style: 'platinum',
    },
  ],
  variable: '--font-luxury',  // css variable name 
});

const sabon = localFont({
  src: [
    {
      path: '/fonts/SabonLTStd-Roman.otf',
      weight: '300',
      style: 'Roman',
    },
    {
      path: '/fonts/SabonLTStd-Italic.otf',
      weight: '500',
      style: 'Italic',
    },
    {
      path: '/fonts/SabonLTStd-BoldItalic.otf',
      weight: '700',
      style: 'BoldItalic',
    },
    {
      path: '/fonts/SabonLTStd-Bold.otf',
      weight: '800',
      style: 'Bold',
    },
  ],
  variable: '--font-sabon',  // css variable name
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${luxury.variable} ${sabon.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
