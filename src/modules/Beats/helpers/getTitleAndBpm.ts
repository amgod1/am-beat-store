const updateTitleStyle = (title: string) => {
  return title.includes("_") ? title : title.toLowerCase().replace(/\ /g, "_")
  // return title.includes("_") ? title : title.toLowerCase().replaceAll(" ", "_")
}

export const getTitleAndBpm = (fileName: string): [string, number] => {
  const titleWithoutProducer = fileName.split(" - ")[1]

  const separator = titleWithoutProducer.includes("_")
    ? titleWithoutProducer.lastIndexOf("_")
    : titleWithoutProducer.lastIndexOf(" ")

  const [title, bpm] = [
    titleWithoutProducer.slice(0, separator),
    parseInt(titleWithoutProducer.slice(separator + 1)),
  ]

  return [updateTitleStyle(title), bpm]
}
