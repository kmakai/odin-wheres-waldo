function CharSelect({ x, y }) {
  return (
    <div
      className="char-select hidden"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <span id="aang" data-ref="zp7z5kxCZjzD5TDn8Wol">
        aang
      </span>
      <span id="naruto" data-ref="faYyCeTaHAe1wTtos9p1">
        naruto
      </span>
      <span id="zoidberg" data-ref="3WGrquFBeOfTwUCAQdlY">
        zoidberg
      </span>
    </div>
  );
}

export default CharSelect;
