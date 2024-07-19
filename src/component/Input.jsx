import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    { label, type = "text", classname = "", text = "", placeholder, ...props },
    ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="inline-block mb-1 pl-1 text-white">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                className={`${classname} px-3 py-2 bg-[#0E0F0F] text-white border-[1px] border-white outline-none focus:bg-[#222222] duration-200  w-full`}
                {...props}
                ref={ref}
                id={id}
            />
        </div>
    )
})

export default Input