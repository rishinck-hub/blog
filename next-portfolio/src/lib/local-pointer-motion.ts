import { gsap } from "gsap";

import { motion } from "@/lib/motion";

type LocalPointerMotionOptions = {
  x?: number;
  y?: number;
  rotation?: number;
};

export function createLocalPointerMotion(
  area: HTMLElement,
  target: HTMLElement,
  { x = 7, y = 5, rotation = 0.35 }: LocalPointerMotionOptions = {},
) {
  const moveX = gsap.quickTo(target, "x", { duration: motion.duration.normal, ease: motion.ease.editorial });
  const moveY = gsap.quickTo(target, "y", { duration: motion.duration.normal, ease: motion.ease.editorial });
  const rotate = gsap.quickTo(target, "rotation", { duration: motion.duration.normal, ease: motion.ease.editorial });
  let bounds = area.getBoundingClientRect();
  let clearWillChange: gsap.core.Tween | undefined;

  const onEnter = () => {
    clearWillChange?.kill();
    bounds = area.getBoundingClientRect();
    target.style.willChange = "transform";
  };
  const onMove = (event: PointerEvent) => {
    const normalizedX = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    const normalizedY = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    moveX(normalizedX * x);
    moveY(normalizedY * y);
    rotate(normalizedX * rotation);
  };
  const onLeave = () => {
    moveX(0);
    moveY(0);
    rotate(0);
    clearWillChange = gsap.delayedCall(motion.duration.normal, () => {
      target.style.willChange = "";
    });
  };

  area.addEventListener("pointerenter", onEnter);
  area.addEventListener("pointermove", onMove, { passive: true });
  area.addEventListener("pointerleave", onLeave);

  return () => {
    area.removeEventListener("pointerenter", onEnter);
    area.removeEventListener("pointermove", onMove);
    area.removeEventListener("pointerleave", onLeave);
    clearWillChange?.kill();
    gsap.killTweensOf(target);
    gsap.set(target, { clearProps: "x,y,rotation,willChange" });
  };
}
