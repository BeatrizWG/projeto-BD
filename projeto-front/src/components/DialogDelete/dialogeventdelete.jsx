import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import api from "@/pages/api/api"


export default function DialogDelete(props) {
    function deleteItem() {
        api.deleteItem(props.id)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-red-500 ">DELETE</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="text-black text-center mb-5">Deseja mesmo deletar?</DialogTitle>
                    <DialogDescription className="text-center ">
                        Deletar este item é uma ação irreversível e não poderá ser desfeita.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button >Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button variant="outline" className="bg-red-600" type="submit" onClick={deleteItem}>Delete</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
