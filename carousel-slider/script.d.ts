type GallerySetting = {
  leftButton: HTMLButtonElement
  rightButton: HTMLButtonElement
  imageContainer: HTMLImageElement

  pageNumber: HTMLDivElement
}

type Model = {
  left: () => void,
  right: () => void
}

type View = {
  update: (currentImageNumber: number) => void,
  create: () => void
}

type Controller = {
  left: () => void,
  right: () => void
}
