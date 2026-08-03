export default function SocialImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#080a09",
        color: "#f4f1e8",
        padding: "72px 82px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: "-0.04em",
          }}
        >
          Track<span style={{ color: "#b8f23d" }}>Fit</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#b8f23d",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 34,
              height: 3,
              background: "#b8f23d",
            }}
          />
          Curtain track specialists
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            maxWidth: 940,
            fontSize: 70,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
          }}
        >
          Professional curtain track installation
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: 840,
            color: "#c9c9c2",
            fontSize: 28,
            lineHeight: 1.35,
          }}
        >
          Where precision meets design.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #343834",
          paddingTop: 24,
          color: "#aeb0aa",
          fontSize: 20,
        }}
      >
        <span>Residential</span>
        <span>Commercial</span>
        <span>Nationwide</span>
        <span style={{ color: "#b8f23d" }}>curtaintrackfitters.com</span>
      </div>
    </div>
  );
}
