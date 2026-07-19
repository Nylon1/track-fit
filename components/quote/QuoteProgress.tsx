type QuoteProgressProps = {
  currentStep: number;
  totalSteps?: number;
  label: string;
};

export default function QuoteProgress({
  currentStep,
  totalSteps = 8,
  label,
}: QuoteProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="tf-quote-progress">
      <div className="tf-quote-progress-top">
        <span>
          Step {String(currentStep).padStart(2, "0")}
        </span>

        <p>{label}</p>

        <span>
          {String(totalSteps).padStart(2, "0")}
        </span>
      </div>

      <div className="tf-quote-progress-track">
        <span
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}