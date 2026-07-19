"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>
        <h1>Something went wrong.</h1>

        <p>{error.message}</p>

        <button onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}