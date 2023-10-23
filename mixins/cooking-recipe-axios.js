import axios from "axios";

const CookingRecipeAxios = {
  beforeMount() {
    let name = "cooking-recipe-token=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        this.token = c.substring(name.length, c.length);
      }
    }
  },
  props: {},
  data() {
    return {
      baseApi: "https://localhost:50270/",
      token: "",
    };
  },
  methods: {
    async Get(path, params) {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
        };

        const response = await axios.get(this.baseApi + path, {
          headers: headers,
          params: params,
        });
        return response.data;
      } catch (error) {
        this.$toast.error(`${error}`, {
          autoClose: 1000,
        });
        return;
      }
    },

    async Post(path, bodyRequest) {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.post(this.baseApi + path, bodyRequest, {
          headers: headers,
        });
        return response.data;
      } catch (error) {
        this.$toast.error(`${error}`, {
          autoClose: 1000,
        });
        return;
      }
    },

    async Put(path, bodyRequest) {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
        };

        const response = await axios.put(this.baseApi + path, bodyRequest, {
          headers: headers,
        });
        return response.data;
      } catch (error) {
        this.$toast.success(`${error}`, {
          autoClose: 1000,
        });
        return;
      }
    },

    async Delete(path, params) {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
        };

        const response = await axios.delete(this.baseApi + path, {
          headers: headers,
          params: params,
        });
        return response.data;
      } catch (error) {
        this.$toast.error(`${error}`, {
          autoClose: 1000,
        });
        return;
      }
    },

    async PostFormData(path, bodyRequest) {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data",
        };

        const response = await axios.post(this.baseApi + path, bodyRequest, {
          headers: headers,
        });
        return response.data;
      } catch (error) {
        this.$toast.error(`${error}`, {
          autoClose: 1000,
        });
        return;
      }
    },

    async PutFormData(path, bodyRequest) {
      try {
        const headers = {
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "multipart/form-data",
        };

        const response = await axios.put(this.baseApi + path, bodyRequest, {
          headers: headers,
        });
        return response.data;
      } catch (error) {
        this.$toast.error(`${error}`, {
          autoClose: 1000,
        });
        return;
      }
    },
  },
};

export default CookingRecipeAxios;
