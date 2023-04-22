import axios from "axios";

const imageUpload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "jobhunting");

    try {
        const res = await axios.post()
    } catch (error) {
        
    }
}