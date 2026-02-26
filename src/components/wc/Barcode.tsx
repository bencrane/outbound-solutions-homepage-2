const heights = [12, 7, 12, 5, 12, 9, 5, 12, 7, 12, 5, 9, 12, 7, 5, 12, 9, 5, 12, 7, 12, 5, 9, 12];

export function Barcode({ className = "wc-barcode" }: { className?: string }) {
  return (
    <div className={className}>
      {heights.map((h, i) => (
        <div key={i} className="bar" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}
