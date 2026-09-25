const periods = [42_000, 49_000, 56_000];
const offsets = [0.12, 0.44, 0.7];
const packetPeriods = [4_800, 5_600, 6_200];

const cycle = (value) => ((value % 1) + 1) % 1;

export function getSatelliteFrame(orbits, elapsedMs, ground = { x: 667, y: 755 }) {
  const satellites = orbits.map((orbit, index) => {
    const distance = cycle(elapsedMs / periods[index] + offsets[index]) * orbit.getTotalLength();
    const point = orbit.getPointAtLength(distance);
    return { x: point.x, y: point.y };
  });
  const links = [
    { from: satellites[0], to: satellites[1] },
    { from: satellites[1], to: satellites[2] },
    { from: satellites[1], to: ground },
  ];
  const packets = links.map(({ from, to }, index) => {
    const progress = cycle(elapsedMs / packetPeriods[index] + index * 0.31);
    return {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
      progress,
    };
  });
  return { satellites, links, packets };
}
