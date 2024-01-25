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
      <form action="" v-on:submit.prevent="createStory()">
        <div>
          <div class="d-flex justify-content-center">
            <!-- add inf food  -->
            <div
              class="m-3 p-3"
              style="
                font-family: Florence, cursive;
                font-size: 18px;
                width: 500px;
                border: solid #ffec99 2px;
              "
            >
              <div>
                <div class="mb-3" style="font-size: 20px">
                  Thông tin món ăn :
                </div>
                <div class="d-flex justify-content-between">
                  <div class="mb-3 me-2">
                    <textarea
                      class="form-control"
                      style="resize: none"
                      rows="1"
                      placeholder="Tên món ăn của bạn"
                      v-model="story.name"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <div class="d-flex justify-content-center">
                      <label
                        for="foodType"
                        class="d-flex align-items-center me-1"
                        >Thể loại :</label
                      >
                      <select
                        name="foodType"
                        id="foodType"
                        style="opacity: 0.5; height: 37px"
                        v-model="story.foodTypeId"
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
                <div class="d-flex justify-content-between mb-3">
                  <div class="d-flex justify-content-center">
                    <label for="foodType" class="d-flex align-items-center me-1"
                      >Món ăn miền :</label
                    >
                    <select
                      name="foodType"
                      id="foodType"
                      style="opacity: 0.5; height: 37px"
                      v-model="story.foodPlaceId"
                    >
                      <option value="1">Miền bắc</option>
                      <option value="2">Miền trung</option>
                      <option value="3">Miền nam</option>
                      <option value="4">Ba miền</option>
                    </select>
                  </div>
                  <div class="d-flex justify-content-center">
                    <label for="foodType" class="d-flex align-items-center me-1"
                      >Cho mùa :</label
                    >
                    <select
                      name="foodType"
                      id="foodType"
                      style="opacity: 0.5; height: 37px"
                      v-model="story.seasonalFoodId"
                    >
                      <option value="1">Mùa xuân</option>
                      <option value="2">Mùa hạ</option>
                      <option value="3">Mùa thu</option>
                      <option value="4">Mùa đông</option>
                      <option value="5">Mùa mưa</option>
                      <option value="6">Mùa khô</option>
                      <option value="7">Mọi mùa</option>
                    </select>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="mb-3 me-2">
                    <textarea
                      class="form-control"
                      style="resize: none"
                      rows="1"
                      placeholder="Thời gian chuẩn bị"
                      v-model="story.preparationTime"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3 me-2">
                    <textarea
                      class="form-control"
                      style="resize: none"
                      rows="1"
                      placeholder="Thời gian nấu ăn"
                      v-model="story.cookingTime"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="mb-3 me-2">
                    <textarea
                      class="form-control"
                      style="resize: none"
                      rows="1"
                      placeholder="Khẩu phần ăn cho :"
                      v-model="story.meal"
                      required
                    ></textarea>
                  </div>
                  <div class="mb-3 me-2">
                    <textarea
                      class="form-control"
                      style="resize: none"
                      rows="1"
                      placeholder="Độ khó"
                      v-model="story.levelOfDifficult"
                      required
                    ></textarea>
                  </div>
                </div>
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    style="resize: none"
                    rows="2"
                    placeholder="Mô tả"
                    v-model="story.title"
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
                  <VueFileAgent
                    :uploadUrl="uploadUrl"
                    v-model:raw-model-value="thumbnail"
                  ></VueFileAgent>
                </div>
                <div class="mb-3">
                  <div
                    class="d-flex justify-content-center"
                    style="text-align: center"
                  >
                    Video hướng dẫn :
                  </div>
                  <VueFileAgent
                    :uploadUrl="uploadUrl"
                    v-model:raw-model-value="video"
                  ></VueFileAgent>
                </div>
              </div>
            </div>
            <!-- add ingredients  -->
            <div style="width: 100px"></div>
            <div
              class="m-3"
              style="
                width: 520px;
                font-family: Florence, cursive;
                border: solid #ffec99 2px;
              "
            >
              <div class="mb-3 d-flex justify-content-between p-3">
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
                class="mb-3 mx-3"
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
                    v-model="item.name"
                    required
                  ></textarea>
                  <div style="width: 40px"></div>
                  <textarea
                    class="form-control"
                    style="resize: none; width: 300px"
                    rows="1"
                    placeholder="Số lượng"
                    v-model="item.quantity"
                    required
                  ></textarea>

                  <div style="width: 40px"></div>
                  <textarea
                    class="form-control"
                    style="resize: none; width: 300px"
                    rows="1"
                    placeholder="Đơn vị"
                    v-model="item.unit"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <!-- add food step -->
          <div
            class="d-flex justify-content-center p-3"
            style="font-family: Florence, cursive; border: solid #ffec99 2px"
          >
            <div>
              <div class="d-flex justify-content-between mb-3">
                <div class="" style="font-size: 20px">
                  Nhớ chia sẻ các công đoạn chính nhé :
                </div>
                <div style="width: 50px"></div>
                <button
                  type="button"
                  @click="addFoodStep()"
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
                v-for="(item, index) in foodStepList"
                style="border: 2px dashed gray"
              >
                <div class="d-flex justify-content-between">
                  <div></div>
                  <div
                    type="button"
                    @click="deleteFoodStep(index)"
                    class="mx-2"
                  >
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                  </div>
                </div>
                <div class="mx-3 mb-2">
                  <textarea
                    class="form-control mb-2"
                    style="resize: none"
                    rows="1"
                    placeholder="Tên giai đoạn"
                    v-model="item.name"
                    required
                  ></textarea>
                  <textarea
                    class="form-control"
                    style="resize: none"
                    rows="3"
                    placeholder="Chi tiết giai đoạn"
                    v-model="item.content"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center my-5">
          <button type="submit" class="btn-create-story p-3">
            Tạo một câu chuyện mới
          </button>
        </div>
        <div style="height: 20px"></div>
      </form>
    </div>
    <div style="height: 40px"></div>
  </div>
</template>

<script>
definePageMeta({
  layout: "profile",
});
import CookingRecipeAxios from "~/mixins/cooking-recipe-axios";
import Utility from "~/mixins/utility";
export default {
  mixins: [CookingRecipeAxios, Utility],
  async beforeMount() {},
  data() {
    return {
      ingredientList: [],
      foodStepList: [],
      story: {
        foodTypeId: "",
        seasonalFoodId: "",
        foodPlaceId: "",
        name: "",
        title: "",
        ingredientList: "",
        foodStepList: "",
        preparationTime: "",
        cookingTime: "",
        meal: "",
        levelOfDifficult: "",
      },
      thumbnail: [],
      video: [],
    };
  },
  methods: {
    deleteIn(index) {
      this.ingredientList.splice(index, 1);
    },
    addIn() {
      this.ingredientList[this.ingredientList.length] = {};
    },
    deleteFoodStep(index) {
      this.foodStepList.splice(index, 1);
    },
    addFoodStep() {
      this.foodStepList[this.foodStepList.length] = {};
    },
    async createStory() {
      const formData = new FormData();
      formData.append("name", this.story.name);
      formData.append(
        "image",
        this.thumbnail[0].file,
        this.thumbnail[0].file.name
      );
      formData.append("video", this.video[0].file, this.video[0].file.name);
      formData.append("title", this.story.title);
      formData.append("foodTypeId", this.story.foodTypeId);
      formData.append("foodPlaceId", this.story.foodPlaceId);
      formData.append("seasonalFoodId", this.story.seasonalFoodId);
      formData.append("preparationTime", this.story.preparationTime);
      formData.append("cookingTime", this.story.cookingTime);
      formData.append("meal", this.story.meal);
      formData.append("levelOfDifficult", this.story.levelOfDifficult);
      formData.append("ingredients", JSON.stringify(this.ingredientList));
      formData.append("foodSteps", JSON.stringify(this.foodStepList));

      if (
        (this.story.foodPlaceId == 1 || this.story.foodPlaceId == 2) &&
        (this.story.seasonalFoodId == 5 || this.story.seasonalFoodId == 6)
      ) {
        this.$toast.error(
          "Miền bắc, miền Trung có 4 mùa Xuân Hạ Thu Đông bạn nhé !",
          {
            autoClose: 1000,
          }
        );
      } else if (
        this.story.foodPlaceId == 3 &&
        (this.story.seasonalFoodId == 1 ||
          this.story.seasonalFoodId == 2 ||
          this.story.seasonalFoodId == 3 ||
          this.story.seasonalFoodId == 4)
      ) {
        this.$toast.error("Miền nam có 2 mùa Mưa và Khô thôi bạn nhé !", {
          autoClose: 1000,
        });
      } else {
        const response = await this.PostFormData(
          "api/Story/CreateStory",
          formData
        );
        if (response.code == "Ok") {
          this.$toast.success(
            "Chúc mừng bạn đã chia sẻ bài viết mới thành công !",
            {
              autoClose: 1000,
            }
          );
          setTimeout(() => {
            this.$router.push({ path: "/" });
          }, 1000);
        } else {
          this.$toast.error("Bị lỗi gì rồi bạn ơi :(( ", {
            autoClose: 1000,
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.btn-create-story {
  border: 0px;
  font-family: Florence, cursive;
  color: #be895b;
  font-size: 18px;
}
</style>
