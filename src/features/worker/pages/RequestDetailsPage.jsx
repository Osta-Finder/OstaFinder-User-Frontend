import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import RequestMainContent from "./../components/RequestMainContent";
import RequestSidebar from "./../components/RequestSidebar";
import RequestMainContent from './../components/RequestMainContent';

export default function RequestDetailsPage() {
  const [currentStep, setCurrentStep] = useState(2); // Starts at "في الطريق" (Step 2)
  const [eta, setEta] = useState("");

  const handleCall = () => {
    toast.info("جاري الاتصال بالعميل أحمد محمود على الرقم +966 50 XXX XXXX...", {
      position: "top-left",
      rtl: true,
      theme: "light",
    });
  };

  const handleChat = () => {
    toast.success("تم فتح نافذة المحادثة المباشرة مع العميل.", {
      position: "top-left",
      rtl: true,
      theme: "light",
    });
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

  const handleStatusUpdate = (action) => {
    if (action === "complete") {
      setCurrentStep(4);
      toast.success("تهانينا! تم تحديث حالة الطلب إلى مكتمل بنجاح 🎉", {
        position: "top-left",
        rtl: true,
        theme: "light",
      });
    } else if (action === "on_the_way") {
      setCurrentStep(2);
      
      let message = "تم تحديث حالة الطلب إلى 'في الطريق' 🚗";
      if (eta) {
        message += ` وسيصل الفني خلال ${eta}.`;
      }
      
      toast.success(message, {
        position: "top-left",
        rtl: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfc] py-6 px-4 md:px-8 relative overflow-hidden" dir="rtl">
      {/* react-toastify Container */}
      <ToastContainer autoClose={3000} limit={5} />

      <div className="max-w-6xl mx-auto">
        {/* Page layout layout grid: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Main content component on the right in RTL */}
          <RequestMainContent
            currentStep={currentStep}
            onStepChange={handleStepChange}
            eta={eta}
            onEtaChange={setEta}
            onStatusUpdate={handleStatusUpdate}
          />

          {/* Sidebar component on the left in RTL */}
          <RequestSidebar
            onCall={handleCall}
            onChat={handleChat}
          />
          
        </div>
      </div>
    </div>
  );
}
