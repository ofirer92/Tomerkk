import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSplash from "@/components/shared/ContactSplash";
import FloatingContact from "@/components/shared/FloatingContact";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingContact />
      <ContactSplash />
    </>
  );
}
