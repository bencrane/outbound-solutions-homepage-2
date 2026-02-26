export function DesignLabel({ title, annotation }: { title: string; annotation?: string }) {
  return (
    <>
      <div className="wc-label">{title}</div>
      {annotation && <div className="wc-annotation">{annotation}</div>}
    </>
  );
}
