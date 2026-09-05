import { forwardRef } from "react";
import "../styles/form.css";


const Textarea = forwardRef(function Textarea(
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
    const textareaId = id || rest.name;

    return (
        <div className="form-field">
            {label && (
                <label htmlFor={textareaId} className="form-label">
                    {label}
                    {rest.required && <span className="required">*</span>}
                </label>
            )}

            <textarea
                ref={ref}
                id={textareaId}
                className={`form-textarea ${error ? "textarea-error" : ""} ${className}`}
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

export default Textarea;