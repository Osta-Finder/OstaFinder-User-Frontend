import { useState } from "react";
import { useGetRequestsQuery, useGetRatingQuery, useCreateRatingMutation, useUpdateRatingMutation, useDeleteRatingMutation } from "../../../services/requestsApi";
import NotificationDialog from "../../../components/ui/NotificationDialog";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import Rating, { StarIcon } from "../../../components/ui/Rating";
import CuButton from "../../../components/ui/Button";
import clsx from "clsx";
import { MessageSquare } from "lucide-react";

const API_TO_STATUS = {
  "معلقة": "pending",
  "مقبولة": "accepted",
  "قيد التنفيذ": "in_progress",
  "مكتملة": "completed",
  "مرفوضة": "rejected",
  "ملغية": "cancelled",
};

function InteractiveStars({ value, onChange, size = "md" }) {
  const sizes = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" };
  const starSize = sizes[size] || sizes.md;
  return (
    <div className="flex items-center gap-1" dir="ltr">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)} className="cursor-pointer transition-transform hover:scale-110">
          <StarIcon className={clsx(starSize, star <= value ? "text-yellow-400" : "text-gray-300")} filled={star <= value} />
        </button>
      ))}
    </div>
  );
}

function RatingCard({ request, onNotify }) {
  const [editing, setEditing] = useState(false);
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [deleting, setDeleting] = useState(false);

  const { data: ratingData, isLoading } = useGetRatingQuery(request._id);
  const [createRating] = useCreateRatingMutation();
  const [updateRating] = useUpdateRatingMutation();
  const [deleteRating] = useDeleteRatingMutation();

  const existingRating = ratingData?.data;
  const hasRating = !!existingRating;

  const handleCreate = async () => {
    if (!stars) return;
    try {
      await createRating({ requestId: request._id, stars, comment }).unwrap();
      onNotify({ title: "تم التقييم", message: "شكراً على تقييمك!", type: "success" });
      setStars(0);
      setComment("");
    } catch {
      onNotify({ title: "خطأ", message: "فشل في إنشاء التقييم", type: "error" });
    }
  };

  const handleUpdate = async () => {
    if (!stars) return;
    try {
      await updateRating({ requestId: request._id, stars, comment }).unwrap();
      onNotify({ title: "تم التحديث", message: "تم تعديل التقييم بنجاح", type: "success" });
      setEditing(false);
    } catch {
      onNotify({ title: "خطأ", message: "فشل في تعديل التقييم", type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRating(request._id).unwrap();
      onNotify({ title: "تم الحذف", message: "تم حذف التقييم", type: "success" });
      setDeleting(false);
    } catch {
      onNotify({ title: "خطأ", message: "فشل في حذف التقييم", type: "error" });
    }
  };

  const startEdit = () => {
    setStars(existingRating?.stars || 0);
    setComment(existingRating?.comment || "");
    setEditing(true);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
        <div className="h-4 w-48 bg-gray-200 rounded mb-4" />
        <div className="h-3 w-32 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-gray-900">طلب #{request.requestNumber}</h3>
          <p className="mt-1 text-sm text-gray-600">{request.service?.name || request.service}</p>
          <p className="mt-0.5 text-xs text-gray-400">
            {request.worker?.name || request.worker} — {request.date ? new Date(request.date).toLocaleDateString("ar-EG") : ""}
          </p>
        </div>
        <span className="text-sm font-bold text-gray-900">{request.amount || 0} ج.م</span>
      </div>

      <hr className="my-4 border-gray-100" />

      {hasRating && !editing ? (
        <div className="space-y-3">
          <Rating rating={existingRating.stars} size="md" />
          {existingRating.comment && (
            <p className="flex items-start gap-2 text-sm text-gray-600">
              <MessageSquare className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              {existingRating.comment}
            </p>
          )}
          <div className="flex gap-2 pt-1">
            <CuButton variant="outline" onClick={startEdit} className="!py-1.5 !px-3 !text-xs">تعديل</CuButton>
            <CuButton variant="outline" onClick={() => setDeleting(true)} className="!py-1.5 !px-3 !text-xs !text-red-600 !border-red-200 hover:!bg-red-50">حذف</CuButton>
          </div>
        </div>
      ) : editing ? (
        <div className="space-y-3">
          <InteractiveStars value={stars} onChange={setStars} />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب تعليقك (اختياري)" className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" rows={2} />
          <div className="flex gap-2">
            <CuButton onClick={handleUpdate} disabled={!stars} className="!py-2 !px-4 !text-xs">حفظ</CuButton>
            <CuButton variant="outline" onClick={() => setEditing(false)} className="!py-2 !px-4 !text-xs">إلغاء</CuButton>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">لم تقيم هذا الطلب بعد</p>
          <InteractiveStars value={stars} onChange={setStars} />
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="اكتب تعليقك (اختياري)" className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100" rows={2} />
          <CuButton onClick={handleCreate} disabled={!stars} className="!py-2 !px-4 !text-xs">إرسال التقييم</CuButton>
        </div>
      )}

      <ConfirmDialog open={deleting} onClose={() => setDeleting(false)} onConfirm={handleDelete} title="حذف التقييم" message="هل أنت متأكد من حذف التقييم؟" confirmText="نعم، حذف" cancelText="تراجع" variant="danger" />
    </div>
  );
}

export default function ClientRating() {
  const [notification, setNotification] = useState(null);
  const { data: requestsData, isLoading } = useGetRequestsQuery();

  const completedOrders = (requestsData?.data || []).filter((r) => {
    const statusKey = API_TO_STATUS[r.status] || r.status;
    return statusKey === "completed";
  });

  return (
    <div className="min-h-screen pt-24" style={{ background: "var(--bg-color)" }}>
      <div className="mx-auto max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <StarIcon className="h-7 w-7 text-yellow-400" filled />
          <h1 className="text-3xl font-extrabold text-gray-900">التقييمات</h1>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-6">
                <div className="h-4 w-48 bg-gray-200 rounded mb-4" />
                <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : completedOrders.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <StarIcon className="mb-4 h-12 w-12 text-gray-300" filled />
            <p className="font-medium text-gray-900">لا توجد طلبات مكتملة</p>
            <p className="mt-1 text-sm text-gray-400">عندما يكتمل طلبك، يمكنك تقييمه هنا</p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedOrders.map((req) => (
              <RatingCard key={req._id} request={req} onNotify={setNotification} />
            ))}
          </div>
        )}
      </div>

      <NotificationDialog open={!!notification} onClose={() => setNotification(null)} title={notification?.title} message={notification?.message} type={notification?.type} />
    </div>
  );
}
