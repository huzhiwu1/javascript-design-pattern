function createLazyLoadImage(src: string, defaultSrc: string) {
  const imageDom = document.createElement("img");
  imageDom.src = defaultSrc;
  const img = new Image();
  const imgProxy = new Proxy(img, {
    set(target, key, value) {
      if (key === "src") {
        target[key] = value;
        img.onload = () => {
          imageDom.src = value;
        };
      }
      return true;
    },
    get(target: HTMLImageElement, key: keyof HTMLImageElement) {
      if (key === "parentNode") {
        return imageDom;
      }
      return target[key];
    },
  });
  const observer = new IntersectionObserver((entires) => {
    entires.forEach(
      (entry) => {
        if (entry.isIntersecting) {
          imgProxy.src = src;
          observer.unobserve(imageDom);
        }
      },
      { thresold: 0.1 }
    );
  });
  observer.observe(imageDom);
  return imageDom;
}
