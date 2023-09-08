"use client"
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

const UploadModal=()=>{
    const uploadModal=useUploadModal();
    const onChange=()=>{
        
    }
    return (
        <Modal onChange={()=>{}}
        title="Upload Modal Title"
        description="Upload Modal Description"
        isOpen={uploadModal.isOpen}
        >
            Upload Content
        </Modal>
    )
}

export default UploadModal