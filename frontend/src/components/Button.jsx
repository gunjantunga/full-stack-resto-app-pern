import "../styles/form.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "medium",
    loading = false,
    disabled = false,
    fullWidth = false,
    className = "",
    ...rest
}) {
    const buttonClassName = [
        "custom-button",
        `button-${variant}`,
        `button-${size}`,
        fullWidth ? "button-full-width" : "",
        className
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type={type}
            className={buttonClassName}
            disabled={disabled || loading}
            {...rest}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;