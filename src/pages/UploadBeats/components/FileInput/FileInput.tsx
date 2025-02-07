import { FC, ChangeEvent, DragEvent, useState } from "react"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { uploadFileToEditor } from "@/modules/Beats/store/slice"

export const FileInput: FC = () => {
  const dispatch = useAppDispatch()
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingOver(true)
    event.dataTransfer.dropEffect = "copy"
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingOver(false)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
    setIsDraggingOver(true)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDraggingOver(false)

    const droppedFile = event.dataTransfer.files[0]

    if (droppedFile && droppedFile.type === "audio/mpeg") {
      dispatch(uploadFileToEditor(droppedFile))
    }
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]

    if (selectedFile && selectedFile.type === "audio/mpeg") {
      dispatch(uploadFileToEditor(selectedFile))
    }
  }

  return (
    <div
      className={`border-primary bg-accent p-8 w-full flex flex-grow items-center justify-center border ${
        isDraggingOver && "border-dashed bg-info"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDraggingOver ? (
        <p>drag and drop file here...</p>
      ) : (
        <>
          <label
            htmlFor="file-upload"
            className="cursor-pointer border border-primary bg-dark h-11 p-2 hover:bg-warning hover:border-warning transition-all duration-200 hover:text-dark"
          >
            upload beat
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  )
}
