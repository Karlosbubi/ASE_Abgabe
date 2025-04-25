import { useState } from "react";
import ChangeInfoDialog from "./ChangeInfoDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import NavBar from "@/components/navigation/NavBar.tsx";
import { GetCurrentUser } from "@/utils/storageWrapper.ts";
import PersonalInfoCard from "@/components/dashboard/PersonalInfoCard";

const Dashboard = () => {
    const [isChangeInfoDialogOpen, setIsChangeInfoDialogOpen] = useState(false);
    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);

    const user = GetCurrentUser();

    const openChangeInfoDialog = () => setIsChangeInfoDialogOpen(true);
    const closeChangeInfoDialog = () => setIsChangeInfoDialogOpen(false);

    const openChangePasswordDialog = () => setIsChangePasswordDialogOpen(true);
    const closeChangePasswordDialog = () => setIsChangePasswordDialogOpen(false);

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center py-12 pt-25">
                {/* Personal Info Card */}
                <PersonalInfoCard
                    name={user?.name}
                    email={user?.email}
                    onChangeInfo={openChangeInfoDialog}
                    onChangePassword={openChangePasswordDialog}
                />

                {/* Change Info Dialog */}
                <ChangeInfoDialog
                    isOpen={isChangeInfoDialogOpen}
                    onClose={closeChangeInfoDialog}
                    name={user?.name}
                    email={user?.email}
                />

                {/* Change Password Dialog */}
                <ChangePasswordDialog
                    isOpen={isChangePasswordDialogOpen}
                    onClose={closeChangePasswordDialog}
                />
            </div>
        </>
    );
};

export default Dashboard;