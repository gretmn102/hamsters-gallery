// @ts-check

/**
 *
 * @param {GallerySetting} gallerySetting
 * @param {string[]} imageSources
 */
function createGallery(gallerySetting, imageSources) {
  function createView(controller) {
    return {
      create: () => {
        gallerySetting.leftButton.onclick = () => void controller.left()
        gallerySetting.rightButton.onclick = () => void controller.right()
      },
      update: (/** @type {number} */ currentImageNumber) => {
        function updateLeftButton() {
          gallerySetting.leftButton.disabled = currentImageNumber === 0
        }

        function updateRightButton() {
          gallerySetting.rightButton.disabled = currentImageNumber === imageSources.length - 1
        }

        function updateImageContainer() {
          const imageContainer = gallerySetting.imageContainer
          imageContainer.setAttribute("src", imageSources[currentImageNumber])

          gallerySetting.leftButton.disabled = true
          gallerySetting.rightButton.disabled = true

          imageContainer.onload = e => {
            updateLeftButton()
            updateRightButton()

            // setTimeout(() => {
            //   updateLeftButton()
            //   updateRightButton()
            // }, 1000)
          }
        }

        function updatePagnum() {
          gallerySetting.pageNumber.textContent = (currentImageNumber + 1).toString()
        }

        updatePagnum()
        updateImageContainer()
      }
    }
  }

  function createModel(view) {
    /** @type {number} */
    let currentImageNumber = 0

    return {
      left: () => {
        if (currentImageNumber > 0) {
          currentImageNumber--

          view.update(currentImageNumber)
        }
      },
      right: () => {
        if (currentImageNumber < imageSources.length - 1) {
          currentImageNumber++

          view.update(currentImageNumber)
        }
      }
    }
  }

  let model
  function createController() {
    return {
      left: () => {
        model.left()
      },
      right: () => {
        model.right()
      }
    }
  }

  let controller = createController()
  let view = createView(controller)
  model = createModel(view)

  view.create()
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
