import { TabLayout } from "@/components/layout/TabLayout";
import { ProfileUser } from "@/modules/managment-panel/components/ProfileUser";
import { TabsConfig } from "@/modules/managment-panel/tab.config";

const ManagmentPanelPage = () => {
  return (
    <div className="p-[30px] flex gap-5 w-full">
      <ProfileUser />
      <TabLayout data={TabsConfig} />
    </div>
  );
};
export default ManagmentPanelPage;
