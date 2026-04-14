import type { Ref } from "react"

interface inputProps {
    placeholder?: string,
    type? : "text" | "password",
    ref?: Ref<HTMLInputElement>
}

const Input = ({placeholder , ref ,type} : inputProps) => {
  return (
    <div>
        <input
        type={type || "text"}
        placeholder={placeholder}
        ref={ref}
        className="px-4 py-2 border w-full border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white text-black placeholder:text-gray-400"
      />
    </div>
  )
}

export default Input