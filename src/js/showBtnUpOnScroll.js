import { btnUp } from "..";

export const showBtnUpOnScroll = () => window.scrollY >= 232 ? btnUp.style.display = 'block' : btnUp.style.display = 'none'