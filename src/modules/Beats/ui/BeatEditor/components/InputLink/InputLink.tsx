import { ChangeEvent, FC } from "react"
import { InputLink as InputLinkProps } from "./InputLink.interface"
import { useAppDispatch } from "@/hooks/useAppDispatch"
import { useAppSelector } from "@/hooks/useAppSelector"
import { setBeatFileLinks } from "@/modules/Beats/store/slice"
import { selectBeatsInfo } from "@/modules/Beats/store/selectors"
import { FileLink } from "@/modules/Beats/interfaces/FileLinks.interface"

export const InputLink: FC<InputLinkProps> = ({ title, disabled }) => {
  const dispatch = useAppDispatch()
  const { fileLinks } = useAppSelector(selectBeatsInfo)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setBeatFileLinks({
        [title]: event.target.value,
      } as FileLink)
    )
  }

  return (
    <input
      type="url"
      placeholder={`${String(title)} url`}
      autoComplete="off"
      disabled={disabled}
      value={fileLinks[title]}
      onChange={onChangeHandler}
      className="w-full bg-dark h-11 p-2 placeholder-green-800 outline-none border border-primary disabled:opacity-50"
    />
  )
}
