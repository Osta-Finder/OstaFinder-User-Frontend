import AccountSidebar from "../components/AccountSidebar";
import PersonalInformation from "../components/PersonalInformation";
import RecentOrders from "../components/RecentOrders";
import SavedAddresses from "../components/SavedAddresses";

export default function AccountDashboardPage() {
  return (
    <main className="min-h-screen bg-[#fbf8fb] px-5 py-10 text-[#2a160f] md:px-10">
      <div className="mx-auto grid max-w-[1520px] gap-7 lg:grid-cols-[285px_minmax(0,1fr)]">
        <AccountSidebar />

        <div className="space-y-7">
          <div className="grid gap-7 xl:grid-cols-2">
            <PersonalInformation />
            <SavedAddresses />
          </div>
          <RecentOrders />
        </div>
      </div>
    </main>
  );
}
