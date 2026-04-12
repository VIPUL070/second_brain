export interface IconProps {
    size?: "sm"| "md" | "lg"
}

const defaultStyles = "cursor-pointer"

export const iconSizeVariants = {
    "sm": `size-3 ${defaultStyles}`,
    "md": `size-4 ${defaultStyles}`,
    "lg": `size-5 ${defaultStyles}`
}