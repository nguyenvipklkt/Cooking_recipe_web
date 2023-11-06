const Utility = {
  data() {
    return {};
  },
  methods: {
    deleteAllLocalStorages() {
      localStorage.clear();
    },

    deleteAllCookies() {
      const cookies = document.cookie.split(";");

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    },
    formatDate(stringDate) {
      var mydate = new Date(stringDate);
      return mydate.toDateString();
    },
    formatImage(img) {
      const config = useRuntimeConfig();
      return config.public.BaseUrl + img;
    },
    convertUrlToFile(path) {
      const urlImage = this.formatImage(path);
      const file = new File([urlImage], urlImage, { type: "image/png" });
      console.log(file);
      const obj = {
        name: path,
        type: "image/*",
        ext: "*",
        file: file,
        url: urlImage,
      };
      return obj;
    },
  },
};

export default Utility;
