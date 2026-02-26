export function QRCode({ size = 60 }: { size?: number }) {
  // Create a realistic QR-like pattern (7x7 grid with corner markers)
  const pattern = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];

  const cellSize = (size - 8) / 7; // 4px padding each side

  return (
    <div
      className="wc-qr-code"
      style={{
        width: size,
        height: size,
        background: 'white',
        borderRadius: 4,
        padding: 4,
        display: 'grid',
        gridTemplateColumns: `repeat(7, ${cellSize}px)`,
        gridTemplateRows: `repeat(7, ${cellSize}px)`,
        gap: 0,
        flexShrink: 0,
      }}
    >
      {pattern.flat().map((cell, i) => (
        <div
          key={i}
          style={{
            background: cell ? '#222' : 'white',
            borderRadius: 0.5,
          }}
        />
      ))}
    </div>
  );
}
