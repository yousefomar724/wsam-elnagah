export const heroAnimation = {
  hidden: { x: 30, opaicty: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { x: { type: 'tween', duration: 0.5 } },
  },
}
export const successAnimation = {
  hidden: { x: -50, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.5 },
  },
}
export const leftToRightAnimation = {
  hidden: { x: -100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { x: { type: 'tween', duration: 0.5 } },
  },
}
export const rightToLeftAnimation = {
  hidden: { x: 100, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { x: { type: 'tween', duration: 0.5 } },
  },
}
export const topToBottomAnimation = {
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { x: { type: 'tween', duration: 0.5 } },
  },
}
export const bottomToTopAnimation = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { x: { type: 'tween', duration: 0.5 } },
  },
}

export const footerBottomToTop = {
  hidden: { y: 50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
  },
}
export const footerTopToBottom = {
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
  },
}

export const loaderVariants1 = {
  animate: {
    scale: [1, 0.5, 1.1, 0.5, 1.1, 0.5, 1.1, 0.5, 1],
    transition: {
      scale: {
        duration: 2,
        delay: 12,
      },
    },
  },
}
export const loaderVariants2 = {
  animate: {
    rotate: [0, 50, -50, 50, -50, 50, -50, 50, 0],
    transition: {
      rotate: {
        delay: 9,
        duration: 2,
      },
    },
  },
}
export const loaderVariants3 = {
  animate: {
    y: [0, 20, -20, 20, -20, 20, -20, 20, 0],
    transition: {
      y: {
        delay: 6,
        duration: 2,
        ease: 'easeInOut',
      },
    },
  },
}
export const loaderVariants4 = {
  animate: {
    scale: [1, 0.5, 1.1, 0.5, 1.1, 0.5, 1.1, 0.5, 1],
    transition: {
      scale: {
        delay: 1,
        duration: 2,
      },
    },
  },
}
