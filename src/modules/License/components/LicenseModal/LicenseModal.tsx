import { FC, Fragment, useState } from "react"
import { useAppDispatch } from "@/hooks"
import { MdClose } from "react-icons/md"
import { hideModal } from "../../store"
import { LEASES } from "@/constants/Leases"
import { LeaseInfo, LeaseItem } from "./components"
import { Button } from "@/components"

export const LicenseModal: FC = () => {
  const [leasePlan, setLeasePlan] = useState(1)
  const dispatch = useAppDispatch()

  const price = LEASES.find((lease) => lease.id === leasePlan)?.price

  const hideModalHandler = () => {
    dispatch(hideModal())
  }

  const updateLeasePlan = (id: number) => () => {
    setLeasePlan(id)
  }

  return (
    <section className="flex flex-col gap-4 w-3/4 h-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent border-primary border p-4 sm:p-8 overflow-y-scroll">
      <div className="flex justify-end">
        <button onClick={hideModalHandler} className="hover:text-warning">
          <MdClose size="2.5rem" />
        </button>
      </div>
      <div className="flex flex-col gap-4 sm:gap-8">
        {LEASES.map((lease) => (
          <Fragment key={lease.id}>
            <LeaseItem
              key={lease.id}
              lease={lease}
              selected={lease.id === leasePlan}
              onClick={updateLeasePlan(lease.id)}
            />
            {lease.id === leasePlan && <LeaseInfo id={leasePlan} />}
          </Fragment>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-xs sm:text-base">total:</p>
          <p className="text-base">{price}$</p>
        </div>
        <div className="flex gap-4">
          <Button>add</Button>
          <Button danger={true} onClick={hideModalHandler}>
            close
          </Button>
        </div>
      </div>
    </section>
  )
}
