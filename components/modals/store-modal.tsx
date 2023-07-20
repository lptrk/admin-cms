"use client"
import {Modal} from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";
import {store} from "next/dist/build/output/store";

export const StoreModal = () => {
    const storeModal = useStoreModal();
    return (
        <Modal
            title='Create Store'
            description='Add a new store to manage products and categories'
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
            >
           **Create Store Modal**
        </Modal>
    )
}