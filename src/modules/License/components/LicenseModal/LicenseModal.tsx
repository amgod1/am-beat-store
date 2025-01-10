import { FC } from "react"
import { useAppDispatch } from "@/hooks"
import { MdClose } from "react-icons/md"
import { hideModal } from "../../store"

const leases = [
  { id: 1, title: "basic lease" },
  { id: 2, title: "pro lease" },
  { id: 3, title: "exclusive lease" },
]

export const LicenseModal: FC = () => {
  const dispatch = useAppDispatch()

  const hideModalHandler = () => {
    dispatch(hideModal())
  }

  return (
    <section className="w-3/4 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent border-primary border p-4">
      <div className="flex justify-end mx-4">
        <button onClick={hideModalHandler} className="hover:text-warning">
          <MdClose size="2.5rem" />
        </button>
      </div>
      <div className="flex flex-col gap-8 m-4">
        {leases.map((lease) => (
          <div
            key={lease.id}
            className="cursor-pointer border border-primary p-4 sm:p-8 hover:bg-warning hover:text-dark bg-dark"
          >
            <h3 className="text-base sm:text-2xl text-nowrap">{lease.title}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}
