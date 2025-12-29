export default function RegisterLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <div className="flex items-center justify-center py-20 px-4 pt-32">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
              Crie Seu Perfil
            </h1>
            <div className="h-6 w-32 bg-gray-200 rounded-lg mx-auto mt-2 animate-pulse"></div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-center mb-4 px-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-bold bg-gray-200 text-gray-400 border-2 border-gray-300">
                    {step}
                  </div>
                  {step < 4 && (
                    <div className="w-6 md:w-16 h-0.5 md:h-1 mx-1 md:mx-2 bg-gray-200" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 md:p-8 shadow-xl">
            <div className="space-y-4">
              {/* Label skeleton */}
              <div className="h-4 w-40 bg-gray-200 rounded-lg animate-pulse"></div>

              {/* Input skeleton */}
              <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse"></div>

              {/* Label skeleton */}
              <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse mt-4"></div>

              {/* Input skeleton */}
              <div className="h-10 w-full bg-gray-100 rounded-lg animate-pulse"></div>

              {/* Label skeleton */}
              <div className="h-4 w-28 bg-gray-200 rounded-lg animate-pulse mt-4"></div>

              {/* Grid buttons skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-12 w-full bg-gray-100 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>

              {/* Button skeleton */}
              <div className="h-10 w-full bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-orange-600/50 rounded-lg animate-pulse mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
