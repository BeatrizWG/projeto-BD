import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import DialogDelete from "@/components/DialogDelete/dialogeventdelete";
import DialogEdit from "@/components/DialogEdit/dialogeventedit";
import DialogCreate from "@/components/DialogCreate/dialogeventcreate";
import SearchDemo from "@/components/Search/search";
import api from "@/pages/api/api";
import { React, useState } from "react";

export async function getServerSideProps() {
  try {
    const data = await api.getProducts();
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        data: [],
      },
    };
  }
}

export default function Home({ data }) {
  const [items] = useState(data);

  return (
    <>
      <Header />

      <div className="flex relative left-[10%] justify-center items-center h-[87vh] w-[80vw] bg-white text-black rounded-md">
        <div className="flex flex-col gap-5 mt-5 w-full">
          <SearchDemo />
          {items.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md gap-4">
              {/* Imagem redonda */}
              <div className="w-16 h-16 overflow-hidden rounded-full">
                <img src={item.link} alt={item.nome} className="w-full h-full object-cover" />
              </div>

              {/* Nome e Descrição */}
              <div className="flex-1 text-base text-gray-800">
                <div className="font-semibold">{item.nome}</div>
                <p className="text-sm text-gray-600">{item.descricao}</p>
              </div>

              {/* Botões */}
              <div className="flex gap-2">
                <DialogDelete id={item._id} />
                <DialogEdit item={item} />
              </div>
            </div>
          ))}
          <DialogCreate />
        </div>
      </div>
      <Footer />
    </>
  );
}
