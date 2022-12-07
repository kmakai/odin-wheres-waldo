function CharSelect({ x, y }) {
  return (
    <div
      className="char-select hidden"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <span>aang</span>
      <span>naruto</span>
      <span>zoidberg</span>
    </div>
  );
}

export default CharSelect;
