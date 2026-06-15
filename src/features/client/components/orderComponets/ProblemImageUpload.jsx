import { ImagePlus, Trash2 } from "lucide-react";

export default function ProblemImageUpload({
  imageFile,
  previewUrl,
  onImageChange,
  onRemove,
}) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        صورة المشكلة (اختياري)
      </label>

      {!previewUrl ? (
        <label
          htmlFor="problem-image"
          className="
            flex flex-col items-center justify-center
            w-full h-48
            border-2 border-dashed border-gray-200
            rounded-2xl
            cursor-pointer
            hover:border-[var(--primary-color)]
            hover:bg-gray-50
            transition
          "
        >
          <ImagePlus
            size={34}
            className="text-[var(--primary-color)] mb-3"
          />

          <p className="font-medium text-gray-700">
            اضغط لاختيار صورة للمشكلة
          </p>

          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG, JPEG, WEBP
          </p>

          <input
            id="problem-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </label>
      ) : (
        <div className="border border-gray-200 rounded-2xl p-3">
          <img
            src={previewUrl}
            alt="معاينة الصورة"
            className="w-full h-56 object-cover rounded-xl"
          />

          <div className="flex items-center justify-between mt-3">
            <div className="text-sm text-gray-500 truncate">
              {imageFile?.name}
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="
                flex items-center gap-1
                text-red-500
                hover:text-red-600
                text-sm
                font-medium
              "
            >
              <Trash2 size={16} />
              حذف الصورة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}