import {GetCurrentUser} from "../../utils/storageWrapper.ts";
import {useQuery} from "react-query";

function MindmapList() {
    const user = GetCurrentUser();
    const { isLoading, error, data } = useQuery({
        queryKey: ['get_mindmap_list'],
        queryFn: async () => {
            if (!user || !user.JWT) {
                throw new Error("User not authenticated.");
            }

            const requestOptions = {
                method: "GET",
                headers: { Authorization: "Bearer " + user.JWT },
            };

            const response = await fetch("http://localhost:3000/mindmap", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        }
    })

    if (isLoading) return <p>loading</p>

    if (error) return <p>error</p>;

    return <p>{JSON.stringify(data)}</p>
}

export default MindmapList;