export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center content-center justify-center text-center">
        <div className="spinner"></div>
        <p className="mt-1 text-lg text-center text-white">Carregando...</p>
      </div>
    </div>
  );
}
