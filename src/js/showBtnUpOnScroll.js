const btnUp = document.querySelector('.button-up')

export const showBtnUpOnScroll = () => window.scrollY >= 232 ? btnUp.style.display = 'block' : btnUp.style.display = 'none'