export const useObserver = <T>(
  selector: string,
  callback: (target: Element | T) => void,
  playOnce = true,
  threshold = 1,
  root = null
) => {
  let options = {
    root,
    rootMargin: '0px',
    threshold,
  }

  const elementToObserve = document.querySelector(selector)
  if (!elementToObserve) return

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        callback(entry.target)
        playOnce && observer.unobserve(entry.target)
      }
    }
  }, options)

  observer.observe(elementToObserve)
}
