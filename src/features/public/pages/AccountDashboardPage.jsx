import AccountSidebar from "../components/AccountSidebar";
import PersonalInformation from "../components/PersonalInformation";
import RecentOrders from "../components/RecentOrders";
import SavedAddresses from "../components/SavedAddresses";

export default function AccountDashboardPage() {
  return (
    <main className="min-h-screen w-11/12 bg-[#fbf8fb] px-4 py-8 sm:px-6 md:px-10 md:py-10 text-[#2a160f]">
      <div
        className="mx-auto max-w-[1520px] grid gap-5 md:gap-7
                grid-cols-1
                lg:grid-cols-[285px_minmax(0,1fr)]"
      >
        {" "}
        <AccountSidebar />
        <div className="space-y-5 md:space-y-7">
          <div className="grid gap-5 md:gap-7 xl:grid-cols-2">
            <PersonalInformation />
            <SavedAddresses />
          </div>
          <RecentOrders />
        </div>
      </div>
    </main>
  );
}
