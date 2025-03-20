import {GetCurrentUser} from "../../utils/storageWrapper.ts";

const PersonalInfoCard = () => {
    //const navigate = useNavigate();
    const user = GetCurrentUser();

    return (
        <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-center font-bold">Personal Info</h1>

            <div>
                <div className="p-2">
                    <label>Name:</label>
                    <input type="text" contentEditable="false" value={user?.name}
                           className="w-full px-3 py-2 text-gray-700 border rounded"/>

                </div>
                <div className="p-2">
                    <label>E-Mail:</label>
                    <input type="text" contentEditable="false" value={user?.email}
                           className="w-full px-3 py-2 text-gray-700 border rounded"/>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoCard;