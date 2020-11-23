const viewportUtil = {
  fixIosWindowScroll() {
    if (
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.platform)
    ) {
      window.addEventListener('scroll', viewportUtil.windowScrollFix);
    }
  },
  removeFixIosWindowScroll() {
    if (
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      /iPhone|iPad|iPod/i.test(navigator.platform)
    ) {
      window.removeEventListener('scroll', viewportUtil.windowScrollFix);
    }
  },

  windowScrollFix() {
    window.scrollTo(0, 0);
  },

  chatBoxSizeFix() {
    const chatBox = document.getElementsByClassName('chat-box')[0];
    chatBox.style.height = window.visualViewport.height - 50 - 40 + 'px';
    window.scrollTo(0, 0);
  },
};
export default viewportUtil;
