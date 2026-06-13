import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  X,
  UploadCloud,
  Camera,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import {
  useUploadImageMutation,
  useUpdateMeMutation,
} from "../../../services/authApi";

export default function ChangeProfilePicModal({ isOpen, onClose, user }) {
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl("");
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("يرجى اختيار ملف صورة صالح");
        return;
      }
      // Limit size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن لا يتجاوز 5 ميجابايت");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("يرجى سحب ملف صورة صالح");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("حجم الصورة يجب أن لا يتجاوز 5 ميجابايت");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("يرجى اختيار صورة أولاً");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("bucket", "profile-pics");

      // Upload to Supabase bucket "profile-pics"
      const uploadRes = await uploadImage(formData).unwrap();

      if (uploadRes?.success && uploadRes?.data?.url) {
        // Update user profile with the uploaded image URL
        await updateMe({ profilePic: uploadRes.data.url }).unwrap();
        toast.success("تم تحديث الصورة الشخصية بنجاح");
        onClose();
      } else {
        throw new Error("فشل الرفع");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "حدث خطأ أثناء تحديث الصورة الشخصية");
    }
  };

  const isLoading = isUploading || isUpdating;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all border border-[#f1ddd4]">
          {/* Header */}
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="grid cursor-pointer h-10 w-10 place-items-center rounded-full text-[#4a2a1d] hover:bg-[#fff3eb] transition-colors"
              aria-label="إغلاق"
              disabled={isLoading}
            >
              <X size={22} />
            </button>
            <DialogTitle className="text-xl font-bold text-[#2a160f]">
              تغيير الصورة الشخصية
            </DialogTitle>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Area / Preview */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                previewUrl
                  ? "border-[#ff7417] bg-[#fffcfb]"
                  : "border-[#f1ddd4] bg-[#fbf8fb] hover:border-[#ff7417] hover:bg-[#fffcfb]"
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                disabled={isLoading}
              />

              {previewUrl ? (
                <div className="relative group/preview">
                  <img
                    src={previewUrl}
                    alt="معاينة"
                    className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-3 text-[#4a2a1d]">
                  <div className="p-4 rounded-full bg-[#ffe0ce]/50 text-[#ff7417]">
                    <UploadCloud size={36} />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">
                      اسحب وأفلت الصورة هنا
                    </p>
                    <p className="text-sm text-[#7a5a4d] mt-1">
                      أو انقر لاختيار ملف من جهازك
                    </p>
                  </div>
                  <span className="text-xs text-[#a08075]">
                    يدعم: PNG, JPG, JPEG (بحد أقصى 5 ميجابايت)
                  </span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={!selectedFile || isLoading}
                className="h-12 flex-1 cursor-pointer rounded-xl bg-[#ff7417] px-5 text-lg font-semibold text-white transition-all hover:bg-[#ff7417]/95 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>جاري الحفظ...</span>
                  </>
                ) : (
                  <span>حفظ التعديل</span>
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="h-12 cursor-pointer rounded-xl border border-[#f1ddd4] hover:bg-[#fff3eb] px-6 text-lg font-medium text-[#4a2a1d] transition-all"
              >
                إلغاء
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
