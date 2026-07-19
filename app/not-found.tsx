export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#070807",
        color: "#f6f3eb",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "12px",
            color: "#b8f23d",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          TrackFit
        </p>

        <h1
          style={{
            margin: 0,
            fontSize: "48px",
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            marginTop: "16px",
            color: "rgba(246,243,235,0.7)",
          }}
        >
          The page you are looking for does not exist.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "24px",
            padding: "14px 20px",
            borderRadius: "14px",
            background: "#b8f23d",
            color: "#070807",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Return home
        </a>
      </div>
    </main>
  );
}