import {GetCurrentUser} from "../../utils/storageWrapper.ts";
import {useQuery} from "react-query";

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
    const dateTime = new Date()
    const { isLoading, error, data } = useQuery<MindmapList, Error>({
        queryKey: [`get_mindmap_list_${dateTime.getMonth()}`],
        queryFn: async () => {
            const user = GetCurrentUser();
            if (!user || !user.JWT) {
                throw new Error("User not authenticated.");
            }

            const requestOptions = {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + user.JWT },
            };

            const response = await fetch("http://localhost:3000/mindmap", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json() ?? 'No Data';
        }
    })

    if (isLoading || (data === undefined)) return <p>loading...</p>

    if (error) return <p>{error?.message}</p>;

    console.log(JSON.stringify(data, null, 2));

    return <div>
        <p><b>My Mindmaps</b></p>
        {data.own.map((m : Entry) => (<p>{m.title}</p>))}
        <p><b>Shared With Me</b></p>
        {data.edit.map((m : Entry) => (<p>{m.title}</p>))}
        <p><b>Read Only</b></p>
        {data.read_only.map((m : Entry) => (<p>{m.title}</p>))}
    </div>
}

export default MindmapList;