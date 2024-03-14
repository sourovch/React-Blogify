export const PAGE_TRANSITION_VARIANT = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { duration: ".3" },
  },
};

export const BLOG_IMAGE_VARIANT = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: "0.3", ease: "easeOut" },
  },
};

export const BLOG_TAG_CONT_VARIANT = {
  initial: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

export const BLOG_TAGS_VARIANT = {
  initial: {
    opacity: 0,
    x: "-30px",
  },
  animate: {
    opacity: 1,
    x: "0",
    transition: { duration: "0.1", ease: "easeOut" },
  },
};

export const FLOATING_BLOG_ACTION = {
  initial: {
    y: "20vh",
    x: "-50%",
  },
  animate: {
    y: 0,
    x: "-50%",
    transition: { ease: "backInOut", duration: 0.8 },
  },
};

export const OVERLAY_VARIANTS = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const SEARCH_VARIANTS = {
  initial: {
    y: "-100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { ease: "backInOut", duration: 0.4 },
  },
};

export const MODAL_VARIANTS = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { ease: "backInOut", duration: 0.5 },
  },
};

export const BUTTON_VARIANTS = {
  initial: {
    scale: 1,
  },
  tap: {
    scale: 0.95,
  },
};

export const BLOG_ACTION_VARIANTS = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};
