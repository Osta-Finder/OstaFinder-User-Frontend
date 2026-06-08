import { useState, useEffect } from "react";

export default function UploadTest() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loadingList, setLoadingList] = useState(true);

  const fetchImages = async () => {
    try {
      setLoadingList(true);
      const res = await fetch("http://localhost:8000/upload?bucket=images", {
        credentials: "include",
      });
      const json = await res.json();
      if (res.ok) setImages(json.data);
    } catch {
      // ignore
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "images");

      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "فشل الرفع");

      setResult(json.data);
      fetchImages();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const [copied, setCopied] = useState(null);

  const handleCopyUrl = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleDelete = async (path) => {
    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, bucket: "images" }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "فشل الحذف");

      fetchImages();
      if (result?.path === path) setResult(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold">اختبار رفع الصور — Supabase</h1>

      {/* File Input */}
      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-48 h-48 object-cover rounded border"
          />
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700"
        >
          {uploading ? "جاري الرفع..." : "ارفع الصورة"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}

      {/* Last Uploaded */}
      {result && (
        <div className="p-4 bg-green-50 rounded border border-green-200 space-y-2">
          <p className="text-green-700 font-medium">تم الرفع بنجاح ✅</p>
          <p className="text-sm text-gray-600 break-all">URL: {result.url}</p>
          <img
            src={result.url}
            alt="uploaded"
            className="w-48 h-48 object-cover rounded border"
          />
        </div>
      )}

      {/* Image Gallery */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">كل الصور المرفوعة</h2>

        {loadingList && <p className="text-gray-500">جاري التحميل...</p>}

        {!loadingList && images.length === 0 && (
          <p className="text-gray-500">مفيش صور مرفوعة لحد دلوقتي</p>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={img.url}
                  alt={`uploaded-${i}`}
                  onClick={() => handleCopyUrl(img.url)}
                  className="w-full h-32 object-cover rounded border cursor-pointer"
                />
                {copied === img.url && (
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    تم النسخ!
                  </span>
                )}
                <button
                  onClick={() => handleDelete(img.path)}
                  className="absolute top-1 left-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
