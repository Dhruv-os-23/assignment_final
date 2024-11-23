import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1]; // Get base64 string without the prefix

      try {
        const response = await axios.post("http://localhost:4999/api/upload", {
          base64Data,
          filename: file.name,
        });

        console.log(response.data);
        const fileId = response.data.fileId;
        console.log(fileId);

        const conversionResponse = await axios.get(`http://localhost:4999/api/convert/${fileId}`, {
          responseType: "blob",
        });
        console.log(conversionResponse.data);
        const pdfUrl = URL.createObjectURL(conversionResponse.data);
        setConvertedFile(pdfUrl);
      } catch (error) {
        console.error("Error uploading or converting file:", error);
      } finally {
        setIsUploading(false);
      }
    };

    reader.readAsDataURL(file); // Read the file as a base64-encoded string
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Docx to PDF Converter</h1>
        <div className="mb-4">
          <input
            type="file"
            accept=".docx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            isUploading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload & Convert"}
        </button>
        {convertedFile && (
          <div className="mt-4 text-center">
            <a
              href={convertedFile}
              download="converted.pdf"
              className="text-blue-600 underline"
            >
              Download Converted PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;