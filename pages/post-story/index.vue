<template>
  <div>
    <div
      class="d-flex justify-content-center my-4"
      style="
        font-family: Florence, cursive;
        font-size: 40px;
        color: #be895b;
        font-weight: 540;
      "
    >
      Viết lên món ăn của bạn
    </div>
    <div
      class="d-flex justify-content-center mx-3"
      style="color: #be895b; border: #ffeede solid 2px"
    >
      <div class="d-flex justify-content-center">
        <form
          action=""
          class="m-3"
          style="font-family: Florence, cursive; font-size: 18px; width: 400px"
        >
          <div>
            <div class="mb-3" style="font-size: 20px">Thông tin món ăn :</div>
            <div class="d-flex justify-content-between">
              <div class="mb-3">
                <textarea
                  class="form-control"
                  style="resize: none"
                  rows="1"
                  placeholder="Tên món ăn của bạn"
                  required
                ></textarea>
              </div>
              <div>
                <div class="d-flex justify-content-center">
                  <select
                    name="foodType"
                    id="foodType"
                    style="opacity: 0.5; height: 37px"
                  >
                    <option value="1">Món kho</option>
                    <option value="2">Món chiên</option>
                    <option value="3">Món xào</option>
                    <option value="4">Món nướng</option>
                    <option value="5">Món gỏi/nộm</option>
                    <option value="6">Món canh/súp</option>
                    <option value="7">Món hấp</option>
                    <option value="8">Món lẩu</option>
                    <option value="9">Món khác</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <textarea
                class="form-control"
                style="resize: none"
                rows="2"
                placeholder="Mô tả"
                required
              ></textarea>
            </div>
            <div class="mb-3">
              <div
                class="d-flex justify-content-center"
                style="text-align: center"
              >
                Nhớ đăng ảnh món ăn để mọi người dễ hình dung nhé :
              </div>
              <VueFileAgent></VueFileAgent>
            </div>
          </div>
        </form>
        <div style="width: 100px"></div>
        <div class="m-3" style="width: 520px; font-family: Florence, cursive">
          <div class="mb-3 d-flex justify-content-between">
            <div style="font-size: 20px">Thông tin nguyên liệu :</div>
            <button
              type="button"
              @click="addIn"
              style="
                background-color: #fff;
                border: 1px solid #fff;
                color: #be895b;
              "
            >
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
          </div>
          <div
            class="mb-3"
            v-for="(item, index) in ingredientList"
            style="border: 2px dashed gray"
          >
            <div class="d-flex justify-content-between">
              <div></div>
              <div type="button" @click="deleteIn(index)" class="mx-2">
                <font-awesome-icon icon="fa-solid fa-xmark" />
              </div>
            </div>
            <div class="mx-3 mb-2 d-flex justify-content-between">
              <textarea
                class="form-control"
                style="resize: none"
                rows="1"
                placeholder="Nhập nguyên liệu"
                required
              ></textarea>
              <div style="width: 40px"></div>
              <textarea
                class="form-control"
                style="resize: none; width: 300px"
                rows="1"
                placeholder="Số lượng"
                required
              ></textarea>

              <div style="width: 40px"></div>
              <textarea
                class="form-control"
                style="resize: none; width: 300px"
                rows="1"
                placeholder="Đơn vị"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
definePageMeta({
  layout: "profile",
});
export default {
  data() {
    return {
      ingredientList: [],
    };
  },
  methods: {
    deleteIn(index) {
      this.ingredientList.splice(index, 1);
    },
    addIn() {
      this.ingredientList[this.ingredientList.length] = {};
    },
  },
};
</script>

<style scoped></style>
