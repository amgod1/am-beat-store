import { FC } from "react"
import { Switch as SwitchProps } from "./Switch.interface"

export const Switch: FC<SwitchProps> = ({ isChecked, onChange }) => (
  <div className="flex items-center gap-4">
    <p>edit</p>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={onChange}
      />
      <div className="w-11 h-6 peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-primary rounded-full peer dark:bg-dark peer-checked:after:translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-primary after:border-accent after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-info"></div>
    </label>
    <p>add</p>
  </div>
)
