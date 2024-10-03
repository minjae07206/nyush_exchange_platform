import Button from "components/Button"
import { useState } from 'react';

export default function SettingsForm() {
    // Specify the state type as string | null
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Handle image change event
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Use optional chaining
        if (file) {
            // Create a URL for the selected file to preview it
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" value="Minjae" name="username" />
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" />
            </div>

            <div>
                <label htmlFor="image">Profile Image:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                />
            </div>

            {selectedImage && (
                <div>
                    <p>Image Preview:</p>
                    <img src={selectedImage} alt="Selected Preview" style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                </div>
            )}

            <button type="submit">Submit</button>
        </form>
    );
}
