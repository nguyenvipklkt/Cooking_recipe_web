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
      if (img == "") {
        return config.public.BaseUrl + "default/avatar-trang.jpg";
      }
      return config.public.BaseUrl + img;
    },
    formatCover(img) {
      const config = useRuntimeConfig();
      if (img == "") {
        return config.public.BaseUrl + "default/anh-bia.webp";
      }
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
    countDate(dateString) {
      let now = new Date();
      const date = new Date(dateString);
      console.log(date);

      let formatDate = now - date;
      // Lấy số phút
      const minutes = Math.floor(formatDate / 60000);

      // Lấy số giờ
      const hours = Math.floor(formatDate / 3600000);

      // Lấy số ngày
      const days = Math.floor(formatDate / 86400000);

      const months = Math.floor(formatDate / (86400000 * 30));

      const years = Math.floor(formatDate / (86400000 * 30 * 12));

      if (years != 0) {
        return years + " years";
      }
      if (months != 0) {
        return months + " months";
      }

      if (days != 0) {
        return days + " days";
      }
      if (hours != 0) {
        return hours + " hours";
      }
      if (minutes != 0) {
        return minutes + " minutes";
      }
      return "now";
    },
  },
};

export default Utility;
