import test from 'node:test';
import assert from 'node:assert/strict';
import { getSatelliteFrame } from '../src/satelliteMotion.js';

const orbits = [
  { getTotalLength: () => 100, getPointAtLength: (distance) => ({ x: 100 + distance, y: 200 }) },
  { getTotalLength: () => 100, getPointAtLength: (distance) => ({ x: 400, y: 200 + distance }) },
  { getTotalLength: () => 100, getPointAtLength: (distance) => ({ x: 700 - distance, y: 300 }) },
];

test('satellites stay unrotated and packet positions follow their live links', () => {
  const first = getSatelliteFrame(orbits, 0);
  const later = getSatelliteFrame(orbits, 8_000);

  assert.equal(first.satellites.length, 3);
  assert.notDeepEqual(later.satellites, first.satellites);
  assert.ok(first.satellites.every(({ rotation }) => rotation === undefined));

  for (const frame of [first, later]) {
    for (const [index, link] of frame.links.entries()) {
      const packet = frame.packets[index];
      const crossProduct = (packet.x - link.from.x) * (link.to.y - link.from.y)
        - (packet.y - link.from.y) * (link.to.x - link.from.x);
      assert.ok(Math.abs(crossProduct) < 0.001);
      assert.ok(packet.progress >= 0 && packet.progress <= 1);
    }
    assert.deepEqual(frame.links[0].from, frame.satellites[0]);
    assert.deepEqual(frame.links[0].to, frame.satellites[1]);
    assert.deepEqual(frame.links[1].from, frame.satellites[1]);
    assert.deepEqual(frame.links[1].to, frame.satellites[2]);
  }
});
