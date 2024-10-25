import Footer from "@/Components/Shared/Footer";
import Navbar from "@/Components/Shared/Navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div style={{ position: "fixed", width: "100%", zIndex: 99 }}>
        <Navbar />
      </div>
      <div style={{ padding: "80px 0px 0px 0px", minHeight: "80vh" }}>
        {children}
      </div>
      <div>
        <Footer />
      </div>
    </section>
  );
}
