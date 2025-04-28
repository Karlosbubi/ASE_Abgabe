import AllUsersCard from "@/components/admin/AllUsersCard.tsx";
import BanUserCard from "@/components/admin/BanUserCard.tsx";
import DeleteUserCard from "@/components/admin/DeleteUserCard.tsx";

const ContentAdminDashboard = () => {

    return (
        <>
            <div className="flex items-center space-x-4">
                <div>
                    <AllUsersCard/>
                </div>
                <div>
                    <BanUserCard/>
                    <DeleteUserCard/>
                </div>
            </div>
        </>
    )
}

export default ContentAdminDashboard;