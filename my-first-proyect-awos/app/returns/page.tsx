import { getReturns } from "@/services/returnService";
import ReturnCard from "@/components/ReturnCard";
import Link from "next/link";

export default async function ReturnsPage() {
    const returns = await getReturns();

    return (
        <main className="min-h-screen bg-black text-white p-8 space-y-12">
            <div className="flex items-center justify-between border-b border-white pb-4">
                <h1 className="text-4xl font-bold">Devoluciones</h1>
                <Link href="/" className="text-white hover:underline opacity-80 hover:opacity-100">
                    Volver al inicio
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {returns.map((ret) => (
                    <Link key={ret.id} href={`/returns/${ret.id}`} className="block">
                        <ReturnCard data={ret} />
                    </Link>
                ))}
            </div>
        </main>
    );
}
