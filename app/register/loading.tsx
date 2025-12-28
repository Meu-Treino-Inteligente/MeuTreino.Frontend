export default function RegisterLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a] text-white">
      <div className="flex items-center justify-center py-20 px-4 pt-32">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Crie Seu Perfil
            </h1>
            <div className="h-6 w-32 bg-gray-800/50 rounded-lg mx-auto mt-2 animate-pulse"></div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-4 px-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold bg-gradient-to-br from-gray-900/80 to-black/80 text-gray-400 border border-purple-500/20">
                    {step}
                  </div>
                  {step < 4 && (
                    <div className="w-6 md:w-16 h-0.5 md:h-1 mx-1 md:mx-2 bg-gray-800/50" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900/80 to-black/80 border border-purple-500/20 rounded-2xl p-4 md:p-8 backdrop-blur-sm shadow-2xl">
            <div className="space-y-6">
              {/* Label skeleton */}
              <div className="h-5 w-40 bg-gray-800/50 rounded-lg animate-pulse"></div>

              {/* Input skeleton */}
              <div className="h-12 w-full bg-gray-800/50 rounded-lg animate-pulse"></div>

              {/* Label skeleton */}
              <div className="h-5 w-32 bg-gray-800/50 rounded-lg animate-pulse mt-4"></div>

              {/* Input skeleton */}
              <div className="h-12 w-full bg-gray-800/50 rounded-lg animate-pulse"></div>

              {/* Label skeleton */}
              <div className="h-5 w-28 bg-gray-800/50 rounded-lg animate-pulse mt-4"></div>

              {/* Grid buttons skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-14 w-full bg-gray-800/50 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>

              {/* Button skeleton */}
              <div className="h-12 w-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-orange-600/50 rounded-full animate-pulse mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
