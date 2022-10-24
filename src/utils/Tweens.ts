import { gsap } from "gsap";

export function moveTween(
  obj: any,
  x: number,
  y: number,
  time: number,
  ease: string,
  cb: any
) {
  const move = gsap.to(obj, {
    x: x,
    y: y,
    duration: time,
    ease: ease,
    onComplete: () => {
      if (cb) {
        cb();
      }
    },
  });
  move.play();
}

export function alphaTween(
  obj: any,
  alpha: any,
  time: number,
  ease: string,
  cb?: any
) {
  const move = gsap.to(obj, {
    alpha,
    duration: time,
    ease: ease,
    onComplete: () => {
      if (cb) {
        cb();
      }
    },
  });
  move.play();
}
