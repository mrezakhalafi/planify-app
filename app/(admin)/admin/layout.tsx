import '../../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}