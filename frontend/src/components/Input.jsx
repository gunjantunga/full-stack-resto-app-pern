import { forwardRef } from "react";
import "../styles/form.css";

const Input = forwardRef(function Input(
    {
        label,
        error,
        helperText,
        className = "",
        id,
        ...rest
    },
    ref
) {
    const inputId = id || rest.name;

    return (
        <div className="form-field">
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                    {rest.required && <span className="required">*</span>}
                </label>
            )}

            <input
                ref={ref}
                id={inputId}
                className={`form-input ${error ? "input-error" : ""} ${className}`}
                {...rest}
            />

            {error ? (
                <p className="error-message">{error}</p>
            ) : helperText ? (
                <p className="helper-text">{helperText}</p>
            ) : null}
        </div>
    );
});

export default Input;