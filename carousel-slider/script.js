// @ts-check

/**
 *
 * @param {GallerySetting} gallerySetting
 * @param {string[]} imageSources
 */
function createGallery(gallerySetting, imageSources) {
  /**
   * @param {View} view
   * @return {Model}
   */
  function createModel(view) {
    /** @type {number} */
    let currentImageNumber = 0

    return {
      left: () => {
        currentImageNumber -= 1
        if (currentImageNumber < 0)
        {
          currentImageNumber = imageSources.length - 1
        }
        view.update(currentImageNumber)
      },
      right: () => {
        currentImageNumber = (currentImageNumber + 1) % imageSources.length
        view.update(currentImageNumber)
      }
    }
  }

  /**
   * @param {Controller} controller
   * @return {View}
   */
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

          // todo: make preloading
          // imageContainer.setAttribute("src", imageSources[currentImageNumber])

          const offset = -currentImageNumber * imageContainer.clientWidth;
          gallerySetting.imageContainer.style.transform = `translateX(${offset}px)`;

          // gallerySetting.leftButton.disabled = true
          // gallerySetting.rightButton.disabled = true

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

  function createController() {
    let model
    /** @type {Controller} */
    const controller = {
      left: () => {
        model.left()
      },
      right: () => {
        model.right()
      }
    }
    const view = createView(controller)
    model = createModel(view)
    view.create()
  }

  createController()
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

  /**
   * @param {string} className
   */
   function getElementsByClassNameOrThrowError(className) {
    const res = document.getElementsByClassName(className)
    if (res.length > 0) {
      return res[0]
    }
    throw new Error(`not found "${className}" class name`)
  }

  /** @type {GallerySetting} */
  const gallerySetting = {
    // @ts-ignore
    leftButton: getElementByIdOrThrowError("left"),
    // @ts-ignore
    rightButton: getElementByIdOrThrowError("right"),
    // @ts-ignore
    imageContainer: getElementsByClassNameOrThrowError("carousel"),
    // @ts-ignore
    pageNumber: getElementByIdOrThrowError("pageNumber"),
  }

  createGallery(gallerySetting, hamsters)
}
