"use client"
import {Modal} from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-modal";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    //Used to decide what elements should be disabled, while Form is loading
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            //Initialize loading sequence
            setLoading(true)

            //create new store
            const response = await axios.post('/api/stores', values)
            toast.success('Store successfully created.')
        } catch (e) {
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <Modal
            title='Create Store'
            description='Add a new store to manage products and categories'
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={'name'}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder={'Name of your Store'} disabled={loading} {...field}/>
                                        </FormControl>
                                        <FormMessage content={'Enter a name'}/>
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
                                <Button
                                    variant={"outline"}
                                    disabled={loading}
                                    onClick={storeModal.onClose}>
                                    Cancel
                                </Button>
                                <Button
                                    type={"submit"}
                                    disabled={loading}>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
        ;
}