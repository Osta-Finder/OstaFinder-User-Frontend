import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  requestsApi,
  useGetRequestByIdQuery,
} from "../../../services/requestsApi";
import RequestMainContent from "./../components/RequestMainContent";
import RequestSidebar from "./../components/RequestSidebar";

const { useUpdateRequestStatusMutation } = requestsApi;

const getStepFromStatus = (status) => {
  switch (status) {
    case "معلقة":
    case "مقبولة":
      return 1;
    case "في الطريق":
      return 2;
    case "قيد التنفيذ":
      return 3;
    case "مكتمل":
    case "مكتملة":
      return 4;
    default:
      return 1; // Default starting step
  }
};

export default function RequestDetailsPage() {
  const [currentStep, setCurrentStep] = useState(2); // Starts at "في الطريق" (Step 2)
  const [eta, setEta] = useState("");

  const { id } = useParams();
  const { data: request, isLoading, error } = useGetRequestByIdQuery(id);
  const { data: requestData } = request || {};
  // console.log("Request Data:", requestData);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateRequestStatusMutation();
  useEffect(() => {
    if (requestData) {
      if (requestData.status) {
        setCurrentStep(getStepFromStatus(requestData.status));
      }
      if (requestData.eta) {
        setEta(requestData.eta);
      }
    }
  }, [requestData]);

  const handleCall = () => {
    toast.info(
      `جاري الاتصال بالعميل ${requestData?.user?.name || "أحمد محمود"} على الرقم ${requestData?.user?.phoneNumber || "+966 50 XXX XXXX"}...`,
      {
        position: "top-left",
        rtl: true,
        theme: "light",
      },
    );
  };

  const handleChat = () => {
    toast.success(
      `تم فتح نافذة المحادثة المباشرة مع العميل ${requestData?.user?.name || "أحمد محمود"}.`,
      {
        position: "top-left",
        rtl: true,
        theme: "light",
      },
    );
  };

  const handleStepChange = (stepNumber) => {
    const stepLabels = ["تم القبول", "في الطريق", "العمل جاري", "مكتمل"];
    setCurrentStep(stepNumber);
    toast.info(`تم الانتقال إلى مرحلة: ${stepLabels[stepNumber - 1]}`, {
      position: "top-left",
      rtl: true,
      theme: "light",
    });
  };

  const handleStatusUpdate = async (action) => {
    if (action === "completed") {
      try {
        await updateStatus({ id, status: "completed" }).unwrap();
        setCurrentStep(4);
        toast.success("تهانينا! تم تحديث حالة الطلب إلى مكتمل بنجاح 🎉", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error("حدث خطأ أثناء تحديث حالة الطلب.", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      }
    } else if (action === "on_the_way") {
      try {
        await updateStatus({ id, status: "on_the_way", eta }).unwrap();
        setCurrentStep(2);
        setEta("");

        let message = "تم تحديث حالة الطلب إلى 'في الطريق' 🚗";
        if (eta) {
          message += ` وسيصل الفني خلال ${eta}.`;
        }

        toast.success(message, {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error("حدث خطأ أثناء تحديث حالة الطلب.", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      }
    } else if (action === "in_progress") {
      try {
        await updateStatus({ id, status: "in_progress" }).unwrap();
        setCurrentStep(3);
        toast.success("تم بدء العمل بنجاح 🛠️", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error("حدث خطأ أثناء تحديث حالة الطلب.", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      }
    } else if (action === "accepted") {
      try {
        await updateStatus({ id, status: "accepted" }).unwrap();
        setCurrentStep(1);
        toast.success("تم قبول الطلب بنجاح ✅", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      } catch (err) {
        console.error("Failed to update status:", err);
        toast.error("حدث خطأ أثناء تحديث حالة الطلب.", {
          position: "top-left",
          rtl: true,
          theme: "light",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-[#fbfbfc] flex items-center justify-center"
        dir="rtl"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold text-sm">
            جاري تحميل تفاصيل الطلب...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen bg-[#fbfbfc] flex items-center justify-center"
        dir="rtl"
      >
        <div className="text-center">
          <p className="text-red-500 font-bold text-lg">
            حدث خطأ أثناء تحميل تفاصيل الطلب.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#fbfbfc] py-6 px-4 md:px-8 relative overflow-hidden"
      dir="rtl"
    >
      {/* react-toastify Container */}
      {/* <ToastContainer autoClose={3000} limit={5} /> */}

      <div className="max-w-6xl mx-auto">
        {/* Page layout layout grid: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main content component on the right in RTL */}
          <RequestMainContent
            requestData={requestData}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            eta={eta}
            onEtaChange={setEta}
            onStatusUpdate={handleStatusUpdate}
            isUpdating={isUpdating}
          />

          {/* Sidebar component on the left in RTL */}
          <RequestSidebar
            requestData={requestData}
            onCall={handleCall}
            onChat={handleChat}
          />
        </div>
      </div>
    </div>
  );
}
