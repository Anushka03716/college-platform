import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        <div className="pt-20">
          {children}
        </div>

        <Footer />

      </body>
    </html>
  );
}