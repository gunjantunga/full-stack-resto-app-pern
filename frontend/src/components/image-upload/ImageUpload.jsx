import React, { useState, useRef } from 'react';
import "../../styles/image-upload.css";
export default function ImageUpload({
    label,
    error,
    helperText,
    onChange,
    id,
    className = "",
    required = false
}) {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const inputId = id || "image-upload";

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            if (onChange) onChange(file);
        } else {
            setPreview(null);
            if (onChange) onChange(null);
        }
    };

    const handleClear = (e) => {
        e.stopPropagation(); // Prevent the click from opening the file dialog
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (onChange) onChange(null);
    };

    return (
        <div className={`form-field ${className}`}>
            {label && (
                <label htmlFor={inputId} className="form-label">
                    {label}
                    {required && <span className="required">*</span>}
                </label>
            )}

            <div
                className={`image-upload-area ${error ? "input-error" : ""}`}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    id={inputId}
                    ref={fileInputRef}
                    accept="image/*"
                    className="image-upload-input"
                    onChange={handleFileChange}
                />

                {preview ? (
                    <div className="image-preview-wrapper">
                        <img
                            src={preview}
                            alt="Preview"
                            className="image-preview-img"
                        />
                        <button
                            type="button"
                            className="image-remove-btn"
                            onClick={handleClear}
                        >
                            &times;
                        </button>
                    </div>
                ) : (
                    <div className="image-placeholder">
                        <span className="image-placeholder-icon">📸</span>
                        <p className="image-placeholder-title">Click to upload restaurant image</p>
                        <span className="image-placeholder-subtitle">SVG, PNG, JPG or GIF (max. 5MB)</span>
                    </div>
                )}
            </div>

            {error ? (
                <p className="error-message">{error}</p>
            ) : helperText ? (
                <p className="helper-text">{helperText}</p>
            ) : null}
        </div>
    );
}