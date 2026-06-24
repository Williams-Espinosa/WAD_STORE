export default function Loading() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-xl font-bold tracking-widest animate-pulse opacity-80">
                    CONECTANDO...
                </p>
            </div>
        </main>
    );
}
