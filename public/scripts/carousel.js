const carouselList = document.querySelectorAll("[carousel]")
console.log(carouselList)

console.log("offsetWidth: ", carouselList[0].offsetWidth)
console.log("clientWidth: ", carouselList[0].clientWidth)
console.log("scrollWidth: ", carouselList[0].scrollWidth)
carouselList.forEach(carouselInit)

/**
 * @param {HTMLDivElement} carousel
 */
function carouselInit(carousel) {
  /** @type {HTMLDivElement} */
  const carousel_scroll_x = carousel.querySelector("[carousel-scroll-x]")

  console.log("offsetWidth: ", carousel_scroll_x.offsetWidth)
  console.log("clientWidth: ", carousel_scroll_x.clientWidth)
  console.log("scrollWidth: ", carousel_scroll_x.scrollWidth)
  carousel.addEventListener("mousemove", (e) => {
    var pad = 32
    var rect = carousel.getBoundingClientRect()
    var boxWidth = rect.width - rect.left
    var mouseX = e.clientX - rect.left
    var percent = Math.round(mouseX / boxWidth * 10000) / 100
    console.log(percent)

    // e.preventDefault()
    // var { clientWidth, scrollWidth } = carousel_scroll_x

    // var { layerX } = e
    // console.log(Math.round(
    //   (scrollWidth * (layerX - pad)) / (clientWidth - (pad)) * 10000 / scrollWidth
    // ) / 100)
    // console.log((scrollWidth * layerX / clientWidth))
  })
}