import { EyeIcon, EyeOffIcon } from "lucide-react"
import { forwardRef, useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

const PasswordInput = forwardRef(
  (
    { placeholder = "Digite sua senha", name, value, onChange, ...props },
    ref
  ) => {
    const [passIsVsible, setPassIsVisible] = useState(false)

    return (
      <div className="relative">
        <Input
          type={passIsVsible ? "text" : "password"}
          placeholder={placeholder}
          ref={ref}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          name={name}
          {...props}
        />
        <Button
          variant="ghost"
          className="absolute bottom-0 right-0 top-0 my-auto mr-1 h-8 w-8 text-muted-foreground"
          onClick={() => setPassIsVisible((prev) => !prev)}
        >
          {passIsVsible ? <EyeIcon /> : <EyeOffIcon />}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export default PasswordInput
