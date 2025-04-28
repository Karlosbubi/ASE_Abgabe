import { useState } from "react";
import ChangeInfoDialog from "./ChangeInfoDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";
import NavBar from "@/components/navigation/NavBar.tsx";
import { GetCurrentUser } from "@/utils/storageWrapper.ts";
import PersonalInfoCard from "@/components/dashboard/PersonalInfoCard";

const Dashboard = () => {
    const [isChangeInfoDialogOpen, setIsChangeInfoDialogOpen] = useState(false);
    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
    const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false);

    const user = GetCurrentUser();

    const openChangeInfoDialog = () => setIsChangeInfoDialogOpen(true);
    const closeChangeInfoDialog = () => setIsChangeInfoDialogOpen(false);

    const openChangePasswordDialog = () => setIsChangePasswordDialogOpen(true);
    const closeChangePasswordDialog = () => setIsChangePasswordDialogOpen(false);

    const openDeleteAccountDialog = () => setIsDeleteAccountDialogOpen(true);
    const closeDeleteAccountDialog = () => setIsDeleteAccountDialogOpen(false);

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
                    onDeleteAccount={openDeleteAccountDialog}
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

                {/* Delete Account Dialog */}
                <DeleteAccountDialog
                    isOpen={isDeleteAccountDialogOpen}
                    onClose={closeDeleteAccountDialog}
                />
            </div>
        </>
    );
};

export default Dashboard;