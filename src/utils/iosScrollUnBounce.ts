export const iosScrollUnbounce = () => {
  const content = document.getElementById("JDoutWrapper");

  if (content) {
    content.addEventListener("touchstart", function(event) {
      // @ts-ignore
      this.allowUp = this.scrollTop > 0;
      // @ts-ignore
      this.allowDown = this.scrollTop < this.scrollHeight - this.clientHeight;
      // @ts-ignore
      this.slideBeginY = event.pageY;
    });

    content.addEventListener("touchmove", function(event) {
      // @ts-ignore
      var up = event.pageY > this.slideBeginY;
      // @ts-ignore
      var down = event.pageY < this.slideBeginY;
      // @ts-ignore
      this.slideBeginY = event.pageY;
      // @ts-ignore
      if ((up && this.allowUp) || (down && this.allowDown)) {
        event.stopPropagation();
      } else {
        event.preventDefault();
      }
    });
  }
};
