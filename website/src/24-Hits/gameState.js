import { atom } from "recoil";

export const shipPositionState = atom({
  key: "shipPosition", // unique ID (with respect to other atoms/selectors)
  default: { position: {}, rotation: {} } // default value (aka initial value)
});

export const enemyPositionState = atom({
  key: "enemyPosition", // unique ID (with respect to other atoms/selectors)
  default: [{ x: -5, y: -2, z:200 }, { x: 5, y: -2, z: 250 },{ x: 0, y: -2, z: 300},
             { x: -2, y: -2, z: 350 }, { x: 2, y: -2, z: 400 },{ x: 1, y: -2, z: 450},
             { x: -4, y: -2, z:510}, { x: 0.5, y: -2, z: 550 },{ x: -3, y: -2, z: 590},
             { x: 3, y: -2, z:640 }, { x: -3.5, y: -2, z: 680 },{ x: 2.5, y: -2, z: 720},
             { x: -5.5, y: -2, z:760}, { x: 0.1, y: -2, z: 790 },{ x: -4.2, y: -2, z:820},
             { x: 3.5, y: -2, z:850 }, { x: 5.5, y: -2, z: 880 },{ x: -3.9, y: -2, z: 910},
             { x: -6, y: -2, z:970}, { x: 6, y: -2, z: 990 },{ x: -5.2, y: -2, z:1010},
             { x: 5.2, y: -2, z:1030 }, { x: -4.1, y: -2, z: 1050 },{ x:4.1, y: -2, z: 1080}] // default value (aka initial value)
});

export const laserPositionState = atom({
  key: "laserPositions", // unique ID (with respect to other atoms/selectors)
  default: [] // default value (aka initial value)
});

export const scoreState = atom({
  key: "score", // unique ID (with respect to other atoms/selectors)
  default: 0 // default value (aka initial value)
});
