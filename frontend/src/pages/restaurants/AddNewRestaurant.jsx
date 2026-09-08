import { useState, useCallback } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import SearchAsyncCombobox from "../../components/auto-search/SearchAsyncCombox";
import ImageUpload from "../../components/image-upload/ImageUpload";
import Textarea from "../../components/Textarea";
import "../../styles/add-new-restaurant.css";
import { notify } from "../../components/Toast/ToastConfig";

export default function AddNewRestaurant() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        owner: null,
        image: null,
        address: ''
    });
    const [formDataError, setFormDataError] = useState({});
    const [resetKey, setResetKey] = useState(0); //this is because after you successfully create a 
    //restaurant the image state and owner state should be clear.

    const getOwner = useCallback(async (query) => {
        try {
            let response = await fetch(`http://localhost:8000/admin/restaurant-owners?search=${query}`);
            if (response.ok) {
                let result = await response.json();
                return result?.data;
            }
        } catch (err) {
            console.log(err)
        }
    }, []);

    const validateForm = () => {
        let error = {};
        let formIsValid = true;

        if (!formData.name) {
            error.name = "Name is required";
            formIsValid = false;
        }
        if (!formData.owner) {
            error.owner = "Owner is required";
            formIsValid = false;
        }
        if (!formData.address) {
            error.address = "Please provide complete address.";
            formIsValid = false;
        }


        setFormDataError(error);
        return formIsValid;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("owner_id", formData.owner.id);
        payload.append("address", formData.address);

        // Append the file if it exists
        if (formData.image) {
            payload.append("image", formData.image);
        }

        try {
            const response = await fetch("http://localhost:8000/admin/restaurant", {
                method: "POST",
                body: payload,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Restaurant created:", result);
                notify.success(result?.message);
                setFormData({
                    name: '',
                    owner: null,
                    image: null,
                    address: ''
                })
                setFormDataError({});

                setResetKey(prev => prev + 1);
            }
            if (!response.ok) {
                let result = await response.json();
                notify.error(result.message)
            }
        } catch (err) {
            console.error("Error creating restaurant:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="add-restaurant-container">
            <div className="add-restaurant-header">
                <h2 className="add-restaurant-title">Add New Restaurant</h2>
                <p className="add-restaurant-subtitle">
                    Create a new restaurant profile and assign an owner.
                </p>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} className="add-restaurant-form">

                <Input
                    label="Restaurant Name"
                    name="restaurantName"
                    placeholder="e.g. Spice Route Cafe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    // required
                    error={formDataError?.name}
                />

                <div className="form-field">
                    <label className="form-label">
                        Assign Owner
                    </label>
                    <SearchAsyncCombobox
                        key={`owner-${resetKey}`}
                        fetchOptions={getOwner}
                        onSelect={(owner) => setFormData({ ...formData, owner })}
                        getDisplayValue={(owner) => owner.name}
                        getKey={(owner) => owner.id}
                        placeholder="Type to search owners..."
                    />
                    {!formData.owner && (
                        <p className="helper-text">Start typing an owner's name.</p>
                    )}
                    {formDataError.owner && (
                        <p className="error-message">Owner is Required.</p>
                    )}
                </div>

                <ImageUpload
                    key={`image-${resetKey}`}
                    label="Restaurant Image"
                    onChange={(file) => setFormData({ ...formData, image: file })}
                    helperText="Recommended size: 800x600px. This will be shown on the customer app."

                />

                <Textarea
                    label="Complete Address"
                    name="address"
                    placeholder="Street, Area, Landmark, City..."
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    // required
                    error={formDataError?.address}

                />

                <div className="add-restaurant-actions">
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                    >
                        Save Restaurant
                    </Button>
                </div>
            </form>
        </div>
    )
}

