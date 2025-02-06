import { FC, useState } from "react"
import { AddTag, EditTag, Switch } from "./components"

const UploadTagsPage: FC = () => {
  const [add, setAdd] = useState(false)

  const onSwitchChange = () => {
    setAdd((value) => !value)
  }

  return (
    <div className="bg-accent border border-primary p-8 flex flex-col gap-3 justify-start w-full min-h-40">
      <Switch isChecked={add} onChange={onSwitchChange} />
      {/* {add ? <AddTag /> : <></>} */}
      {add ? <AddTag /> : <EditTag />}
    </div>
  )
}

export default UploadTagsPage
