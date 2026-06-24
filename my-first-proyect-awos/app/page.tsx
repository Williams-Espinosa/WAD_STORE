import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-12 text-center">

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Bienvenido a WAD STORE
          </h1>
          <p className="text-lg text-gray-400">
            Estos son nuestros recursos...
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            href="/shipments"
            className="flex-1 block border border-white rounded-lg p-6 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <h2 className="text-2xl font-bold mb-2">Envíos</h2>
            <p className="text-sm opacity-80">
              Ver el estado de los paquetes y entregas.
            </p>
          </Link>

          <Link
            href="/returns"
            className="flex-1 block border border-white rounded-lg p-6 hover:bg-white hover:text-black transition-colors duration-200"
          >
            <h2 className="text-2xl font-bold mb-2">Devoluciones</h2>
            <p className="text-sm opacity-80">
              Gestionar los retornos de productos.
            </p>
          </Link>
        </div>

      </div>
    </main>
  );
}