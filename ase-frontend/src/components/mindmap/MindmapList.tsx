import { GetCurrentUser } from "../../utils/storageWrapper.ts";
import { useQuery } from "react-query";
import useStore from "./Store.tsx";

type Entry = {
    id: number;
    title: string;
}

type MindmapList = {
    own: Entry[];
    edit: Entry[];
    read_only: Entry[];
};

function MindmapList() {
    const dateTime = new Date();
    const loadMindMap = useStore(state => state.loadMindMap);

    const { isLoading, error, data } = useQuery<MindmapList, Error>({
        queryKey: [`get_mindmap_list_${dateTime.getMonth()}`],
        queryFn: async () => {
            const user = GetCurrentUser();
            if (!user || !user.JWT) {
                throw new Error("User not authenticated.");
            }

            const response = await fetch("http://localhost:3000/mindmap", {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + user.JWT },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        }
    });

    const handleClick = async (id: number) => {
        await loadMindMap(id);
    };

    if (isLoading || !data) return <p>Loading mindmaps...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div>
            <p><b>My Mindmaps</b></p>
            {data.own.map((m) => (
                <p key={m.id} onClick={() => handleClick(m.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {m.title}
                </p>
            ))}

            <p><b>Shared With Me</b></p>
            {data.edit.map((m) => (
                <p key={m.id} onClick={() => handleClick(m.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {m.title}
                </p>
            ))}

            <p><b>Read Only</b></p>
            {data.read_only.map((m) => (
                <p key={m.id} onClick={() => handleClick(m.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                    {m.title}
                </p>
            ))}
        </div>
    );
}

export default MindmapList;