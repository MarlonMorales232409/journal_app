export const fileUpload = async (file) => {
    const cloudUrl = "https://api.cloudinary.com/v1_1/dnecrkosa/image/upload";

    const formData = new FormData();
    formData.append("upload_preset", "dd7vmhsm");
    formData.append("file", file);

    try {
        const response = await fetch(cloudUrl, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            const cloudResp = await response.json();
            return cloudResp.secure_url;
        } else {
            throw await response.json();
        }
    } catch (error) {
        await error.json();
    }
};
