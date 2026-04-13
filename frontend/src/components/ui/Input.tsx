interface inputProps {
    onChange?: () => void,
    placeholder?: string
}

const Input = ({placeholder , onChange} : inputProps) => {
  return (
    <div>
        <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="px-4 py-2 border w-full border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 bg-white text-black placeholder:text-gray-400"
      />
    </div>
  )
}

export default Input