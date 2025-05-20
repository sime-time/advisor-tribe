async function handleImageUpload(event: Event) {
	const input = event.target as HTMLInputElement;
	if (input.files?.length) {
		form.image = input.files[0];
	}
}

async function uploadAvatar(file: File) {
	try {
		const formData = new FormData();
		formData.append("image", file);

		const response = await fetch("/api/upload-avatar", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Upload failed");
		}

		const { url } = await response.json();
		return url;
	}
	catch (error) {
		console.error("Upload error:", error);
		throw error;
	}
}
