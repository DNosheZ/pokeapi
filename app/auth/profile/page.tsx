import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");

  const { username, firstname, email, createdAt } = session.user as any;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="max-w-md mx-auto bg-white border border-[var(--grey-2)] rounded-xl shadow-md overflow-hidden m-8">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div
                className="w-28 h-28 rounded-full bg-[var(--green-1)]
                          ring-2 ring-[color:var(--purple-1)]/10
                          shadow-[0_6px_14px_-4px_rgba(0,0,0,0.25)]
                          flex items-center justify-center overflow-hidden"
                aria-hidden="true"
              >
                <img
                  src="/images/dragonite.png"
                  alt="Avatar tipo dragón del usuario"
                  className="w-24 h-24 object-contain"
                />
              </div>
            </div>

            <div className="space-y-2">
              <p><span className="font-semibold text-[var(--purple-1)]">Usuario:</span> {username}</p>
              <p><span className="font-semibold text-[var(--purple-1)]">Nombre:</span> {firstname}</p>
              <p><span className="font-semibold text-[var(--purple-1)]">Correo:</span> {email}</p>
              <p><span className="font-semibold text-[var(--purple-1)]">Fecha de creación:</span> {createdAt}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
