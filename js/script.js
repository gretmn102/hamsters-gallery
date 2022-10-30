// @ts-check

/**
 *
 * @param {GallerySetting} gallerySetting
 * @param {string[]} imageSources
 */
function createGallery(gallerySetting, imageSources) {
  /** @type {number} */
  let currentImageNumber = 0

  function updateLeftButton() {
    gallerySetting.leftButton.disabled = currentImageNumber === 0
  }

  function updateRightButton() {
    gallerySetting.rightButton.disabled = currentImageNumber === imageSources.length - 1
  }

  function updateImageContainer() {
    gallerySetting.imageContainer.setAttribute("src", imageSources[currentImageNumber])
  }

  function updatePagnum() {
    gallerySetting.pageNumber.textContent = (currentImageNumber + 1).toString()
  }

  function update() {
    updateLeftButton()
    updateRightButton()
    updatePagnum()
    updateImageContainer()
  }

  function left() {
    if (currentImageNumber > 0) {
      currentImageNumber--

      update()
    }
  }

  function right() {
    if (currentImageNumber < imageSources.length - 1) {
      currentImageNumber++

      update()
    }
  }

  gallerySetting.leftButton.onclick = () => void left()
  gallerySetting.rightButton.onclick = () => void right()
  update()
}

const hamsters = [
  "hamster1.jpeg",
  "hamster2.jpg",
  "hamster3.jpg"
].map(filename => `../assets/${filename}`)

document.onreadystatechange = _ => {
  /**
   * @param {string} id
   */
  function getElementByIdOrThrowError(id) {
    const res = document.getElementById(id)
    if (res) {
      return res
    }
    throw new Error(`not found "${id}" id`)
  }

  /** @type {GallerySetting} */
  const gallerySetting = {
    // @ts-ignore
    leftButton: getElementByIdOrThrowError("left"),
    // @ts-ignore
    rightButton: getElementByIdOrThrowError("right"),
    // @ts-ignore
    imageContainer: getElementByIdOrThrowError("img"),
    // @ts-ignore
    pageNumber: getElementByIdOrThrowError("pageNumber"),
  }

  createGallery(gallerySetting, hamsters)
}
