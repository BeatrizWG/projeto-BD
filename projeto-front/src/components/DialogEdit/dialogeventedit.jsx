import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import api from "@/pages/api/api"

export default function DialogEdit({ item }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        link: "",
        amount: "",
        value: "",
        description: ""
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.nome || "",
                category: item.categoria || "",
                link: item.link || "",
                amount: item.quantidade || "",
                value: item.valor || "",
                description: item.descricao || ""
            });
        }
    }, [item]);

    function atualizar(item) {
        setFormData({
            name: item.nome || "",
            category: item.categoria || "",
            link: item.link || "",
            amount: item.quantidade || "",
            value: item.valor || "",
            description: item.descricao || ""
        });
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };
    const { register, handleSubmit } = useForm()
    function editItem(itemEdit) {
        api.editItem(itemEdit.name, parseInt(itemEdit.value), itemEdit.description, itemEdit.category, parseInt(itemEdit.amount), item.link, item._id)  
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => { atualizar(item) }} variant="outline" className="bg-black text-white">EDITAR</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px]">
                <DialogHeader className="mb-5">
                    <DialogTitle className="text-black text-center mb-5">Vamos editar as informações.</DialogTitle>
                    <DialogDescription className="text-center">
                        Preencha os campos que deseja atualizar e clique em "Save".
                    </DialogDescription>
                </DialogHeader>
                <form className="gap-4 py-4" onSubmit={handleSubmit(editItem)}>
                    <div className="items-center gap-4">
                        <Label htmlFor="name" className="text-right text-black">
                            Name
                        </Label>
                        <Input {...register("name")} id="name" value={formData.name} onChange={handleChange} className="col-span-3 text-black w-1/2" />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="category" className="text-right text-black">
                            Category
                        </Label>
                        <Input {...register("category")} id="category" value={formData.category} onChange={handleChange} className="col-span-3 text-black w-1/2" />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="link" className="text-right text-black">
                            ImageLink
                        </Label>
                        <Input {...register("link")} id="link" value={formData.link} onChange={handleChange} className="col-span-3 text-black w-1/2" />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="amount" className="text-right text-black">
                            Amount (units)
                        </Label>
                        <Input {...register("amount")} type="number" id="amount" value={formData.amount} onChange={handleChange} className="col-span-3 text-black w-20" />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="value" className="text-right text-black">
                            Value (R$)
                        </Label>
                        <Input {...register("value")} type="number" id="value" value={formData.value} onChange={handleChange} className="col-span-3 text-black w-20" />
                    </div>
                    <div className="items-center gap-4">
                        <Label htmlFor="description" className="text-right text-black">
                            Description
                        </Label>
                        <Textarea {...register("description")} id="description" value={formData.description} onChange={handleChange} className="col-span-3 text-black w-3/4" />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button">Close</Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant="outline" className="bg-green-600" type="submit">Save</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog >
    );
}
