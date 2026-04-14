import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../config";

export const useContent = () => {
    const [contents, setContents] = useState([]);

    const refresh = () => {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => {
            setContents(response.data.content);
        })
        .catch(() => {
            toast.error("Failed to load content");
        });
    };

    useEffect(() => {
        refresh();
    }, []);

    return { contents, refresh };
};