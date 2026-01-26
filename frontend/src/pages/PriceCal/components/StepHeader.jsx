export default function StepHeader({ step, total }) {
  return (
    <div className="step-header">
      <div className="step-header-top">
        <h1 className="step-title">Build Your Jawai Experience</h1>
        <p className="step-subtitle">
          Step {step} of {total} · Customize your perfect safari journey
        </p>
      </div>

      <div className="progress-bar-wrapper">
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="progress-dots">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`dot ${i + 1 === step ? "current" : ""} ${
              i + 1 < step ? "completed" : ""
            }`}
          >
            {i + 1 < step ? "✓" : i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}