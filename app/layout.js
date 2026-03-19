import "./globals.css";

export const metadata = {
  title: "CloudDrive",
  description: "Cloud Storage Application",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">

        <div className="max-w-screen-xl mx-auto">
          {children}
        </div>

      </body>
    </html>
  );

}