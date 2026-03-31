import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
