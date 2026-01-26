export default function BottomNav({ step, total, onNext, onBack }) {
    const progress = Math.round((step / total) * 100);
    const isLast = step === total;
  
    return (
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl
                   animate-[slideUp_0.45s_cubic-bezier(0.4,0,0.2,1)]"
      >
        {/* Progress bar */}
        <div className="h-1.5 w-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-700
                       transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
  
        <div className="flex items-center justify-between px-4 py-3">
          {/* Back button */}
          <button
            onClick={onBack}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${
                step === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100 active:scale-95"
              }`}
          >
            ← Back
          </button>
  
          {/* Step indicator */}
          <div className="text-xs font-medium text-gray-500">
            {isLast ? (
              <span className="text-green-700 font-semibold">
                Final step 🎯
              </span>
            ) : (
              <>
                Step <span className="text-gray-800">{step}</span> of {total}
              </>
            )}
          </div>
  
          {/* Next / Finish button */}
          <button
            onClick={onNext}
            className={`px-6 py-2 rounded-lg text-sm font-semibold text-white
              transition-all duration-300 active:scale-95
              ${
                isLast
                  ? "bg-gradient-to-r from-green-600 to-green-700 animate-pulse hover:from-green-700 hover:to-green-800"
                  : "bg-black hover:bg-gray-900"
              }`}
          >
            {isLast ? "Finish 🎉" : "Next →"}
          </button>
        </div>
      </div>
    );
  }