import { Buffer } from "node:buffer";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import process from "node:process";

export default defineEventHandler(async (event) => {
	try {
		const formData = await readFormData(event);
		const file = formData.get("image") as File;

		if (!file) {
			throw createError({
				statusCode: 400,
				message: "No file uploaded",
			});
		}
		// Create uploads directory if it doesn't exist
		const uploadsDir = join(process.cwd(), "public", "uploads");
		await mkdir(uploadsDir, { recursive: true });

		// Generate unique filename
		const fileName = `${Date.now()}-${file.name}`;
		const filePath = join(uploadsDir, fileName);

		// Write file to disk
		const buffer = await file.arrayBuffer();
		await writeFile(filePath, Buffer.from(buffer));

		// Return the public URL
		return { url: `/uploads/${fileName}` };
	}
	catch (error) {
		console.error("Upload error:", error);
		throw createError({
			statusCode: 500,
			message: "Failed to upload image",
		});
	}
});
