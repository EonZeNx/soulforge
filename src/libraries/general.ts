
export function isNull(x: any): boolean {
  return x === undefined || x === null;
}

export function randomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(x: number, min: number, max: number) {
  return Math.max(Math.min(x, max), min);
}

export function rollDie(size: number) {
  return randomInt(1, size);
}