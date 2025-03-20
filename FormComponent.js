import React, { useState } from 'react';

const FormComponent = () => {
    const [hasDisability, setHasDisability] = useState(null);

    const handleDisabilityChange = (event) => {
        setHasDisability(event.target.value);
    };

    return (
        <form>
            {/* ...existing code... */}
            <div>
                <label>Do you have any form of disability?</label>
                <select onChange={handleDisabilityChange}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            {hasDisability === 'yes' && (
                <div>
                    <label>State disability type</label>
                    <input type="text" name="disabilityType" />
                </div>
            )}
            {/* ...existing code... */}
        </form>
    );
};

export default FormComponent;
