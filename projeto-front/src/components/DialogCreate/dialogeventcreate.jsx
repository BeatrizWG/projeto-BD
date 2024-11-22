import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import api from "@/pages/api/api"

export default function DialogCreate() {
    const { register, handleSubmit } = useForm()
    function createItem(item) {
        api.createItem(item.name, parseInt(item.value), item.description, item.category, parseInt(item.amount), item.link)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500 text-white w-20 self-center rounded-full">+</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="text-black text-center mb-5">Vamos criar um novo item.</DialogTitle>
                    <DialogDescription className="text-center ">
                        Preencha os campos que deseja atualizar e clique em &lsquo;Save&lsquo;.
                    </DialogDescription>
                </DialogHeader>
                <form className=" gap-4 py-4" onSubmit={handleSubmit(createItem)}>
                    <div className="  items-center gap-4 ">
                        <Label htmlFor="name" className="text-right text-black">
                            Name (Product)
                        </Label>
                        <Input {...register("name")} id="name" className="col-span-3 text-black w-1/2" />
                    </div>
                    <div className="  items-center gap-4 ">
                        <Label htmlFor="category" className="text-right text-black">
                            Category (Product)
                        </Label>
                        <Input  {...register("category")} id="category" className="col-span-3 text-black w-1/2" />
                    </div>
                    <div className="  items-center gap-4 ">
                        <Label htmlFor="link" className="text-right text-black">
                            ImageLink (URL)
                        </Label>
                        <Input  {...register("link")} id="link" className="col-span-3 text-black w-1/2" />
                    </div>
                    <div className=" items-center gap-4">
                        <Label htmlFor="amount" className="text-right text-black">
                            Amount (units)
                        </Label>
                        <Input  {...register("amount")} type="number" id="amount" className="col-span-3 text-black w-20" />
                    </div>
                    <div className=" items-center gap-4">
                        <Label htmlFor="value" className="text-right text-black">
                            Value (R$)
                        </Label>
                        <Input  {...register("value")} type="number" id="value" className="col-span-3 text-black w-20" />

                    </div>

                    <div className="  items-center gap-4">
                        <Label htmlFor="description" className="text-right text-black">
                            Description
                        </Label>
                        <Textarea {...register("description")} id="description" className="col-span-3 text-black w-3/4" />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button">
                                Close
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant="outline" className="bg-green-600" type="submit" >Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
