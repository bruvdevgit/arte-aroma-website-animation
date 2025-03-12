
// This utility function is short, but it was not easy to derive.
//
// It's for taking `value`, the progress indicator that goes from 0 to 1
// which is passed to a tween callback,
// and mapping it to progress in a subrange.
//
// Prefix:
// -> `value` has the inclusive range of 0 to 1
//
// For mapping value to a subvalue I derived this formula:
// 
// f(x) = x/(b - a) + 1 - (b/(b-a))
//
// where 
// -> a and b are the inclusive bounds for the subvalue 
// -> 0 <= a <= x <= b <= 1
// 
// But if ever
// -> x<0 or x<a then f(x) = 0
// -> x>1 or x>b then f(x) = 1
//
export function mapValueToSubrange(x: number, [a, b]: [number, number]) {
  if (x < 0 || x < a) return 0;
  if (x > 1 || x > b) return 1;
  return x / (b - a) + 1 - (b / (b - a));
}

export function calculateRotationFromSouthIs0Rad(xMove: number, yMove: number) {
  let rotationAngle = 0;
  const [xMoveAbs, yMoveAbs] = [Math.abs(xMove), Math.abs(yMove)];

  // 0 to 90 or PI/2
  if (xMove >= 0 && yMove >= 0) {
    rotationAngle = yMove == 0
      ? Math.PI / 2
      : Math.tan(xMoveAbs / yMoveAbs);
  }
  // 91 to 180 or PI
  else if (xMove >= 0 && yMove < 0) {
    rotationAngle = xMove == 0
      ? Math.PI
      : Math.PI / 2 + Math.tan(yMoveAbs / xMoveAbs);
  }
  // 180 to 270 or 3/2 * PI
  else if (yMove < 0 && xMove < 0) {
    rotationAngle = Math.PI + Math.tan(xMoveAbs / yMoveAbs);
  }
  // 271 to 360 or 2 * PI
  else if (yMove >= 0 && xMove < 0) {
    rotationAngle = yMove == 0
      ? (3 / 2) * Math.PI
      : (3 / 2) * Math.PI + Math.tan(xMoveAbs / yMoveAbs);
  }
  else {
    throw new RangeError(`Unaccounted for x and y movement : [${xMove},${yMove}]`);
  }

  return Math.abs(rotationAngle);
}
