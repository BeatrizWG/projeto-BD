import axios from "axios";

const api = {
  url: "http://localhost:5002",

  async getProducts() {
    const response = await axios.get(this.url + "/api/products");
    return response.data;
  },

  async getOneProduct(name) {
    const response = await axios.get(this.url + `/api/products/${name}`, {
      name: nome,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data
  },
  async deleteItem(id) {
    const response = await axios.delete(this.url + `/api/products/${id}`, {
      id: id,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data
  },

  async editItem(name, price, description, category, amount, link, id) {
    const response = await axios.put(this.url + `/api/products/${id}`, {
      nome: name,
      valor: price,
      descricao: description,
      categoria: category,
      quantidade: amount,
      link,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.data
  },
  async createItem(name, price, description, category, amount, link) {
    try {
      const response = await axios.post(this.url + `/api/products`, {
        nome: name,
        valor: price,
        descricao: description,
        categoria: category,
        quantidade: amount,
        link,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data
    } catch (error) {
      console.error("Error creating item:", error);
    }
  },

};

export default api;