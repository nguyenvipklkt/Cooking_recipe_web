<template>
  <div class="h-100 w-100">
    <div
      class="h2 p-4 d-flex justify-content-center"
      style="font-family: Florence, cursive; color: #be895b"
    >
      {{
        "Hãy cùng " +
        user.firstName +
        " " +
        user.lastName +
        " làm món ăn này nhé !"
      }}
    </div>
    <hr />
    <div
      class="d-flex justify-content-center pt-4"
      style="text-align: center; font-family: Florence, cursive; color: #be895b"
    >
      <div class="ms-4">
        <div>
          <div class="h3 mb-4">{{ "Món ăn hôm nay : " + food.name }}</div>
          <img
            class="mb-4"
            :src="[formatImage(food.thumbnails)]"
            alt=""
            style="width: 500px; border-radius: 8px"
          />
          <div class="h5 mb-4">{{ food.title }}</div>
        </div>
        <div>
          <div class="h3 mb-4">Nguyên liệu cần dùng nè :</div>
          <div class="mb-4">
            <div class="d-flex justify-content-center">
              <div class="px-5 py-3" style="border: 1px solid #ffeede">
                <div
                  v-for="i in ingredientList"
                  class="d-flex"
                  style="font-size: 20px"
                >
                  <div class="me-2">{{ i.name + " : " }}</div>
                  <div class="d-flex">
                    <div class="me-2">{{ i.quantity }}</div>
                    <div>{{ i.unit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="h3 mb-4">
            {{
              "Các công đoạn nấu ăn do " +
              user.firstName +
              " " +
              user.lastName +
              " chia sẻ :"
            }}
          </div>
          <div style="padding: 0 10% 0 10%">
            <div v-for="ft in foodStepList">
              <div>
                <div>
                  <div class="h4 mb-3">
                    {{ "Bước " + ft.noStep + " : " + ft.name }}
                  </div>
                  <div class="mb-3" style="font-size: 20px">
                    {{ ft.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4 align-items-center">
      <form action="" class="d-flex">
        <textarea
          class="form-control"
          style="
            resize: none;
            width: 800px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          "
          rows="2"
          placeholder="Nhớ để lại bình luận để cải thiện bài viết hơn nhé bạn !"
          required
        ></textarea>
        <button
          style="border: 1px solid #dee2e6; height: 61.6px; border-left: 0"
          type="submit"
        >
          <font-awesome-icon
            icon="fa-solid fa-paper-plane"
            class="px-4"
            style="font-size: 25px"
          />
        </button>
      </form>
    </div>
    <div style="height: 100px"></div>
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
  components: {},
  async beforeMount() {
    await this.getFood();
    await this.getIngredientList();
    await this.getFoodStepList();
    await this.getUserInf();
  },
  data() {
    return {
      food: {},
      ingredientList: {},
      foodStepList: {},
      user: {},
    };
  },
  methods: {
    async getFood() {
      let foodId = this.$route.query.page;
      const data = await this.Get(`api/Food/GetFood?foodId=${foodId}`);
      if (data.code == "Ok") {
        this.food = data.data;
      } else {
        this.$toast.error(
          "Lỗi hiển thị thông tin món ăn rồi bạn đợi một chút nhé !",
          {
            autoClose: 1000,
          }
        );
      }
    },
    async getIngredientList() {
      let foodId = this.$route.query.page;
      const data = await this.Get(
        `api/Ingredients/GetIngredientList?foodId=${foodId}`
      );
      if (data.code == "Ok") {
        this.ingredientList = data.data;
      } else {
        this.$toast.error(
          "Lỗi hiển thị nguyên liệu rồi bạn đợi một chút nhé !",
          {
            autoClose: 1000,
          }
        );
      }
    },
    async getFoodStepList() {
      let foodId = this.$route.query.page;
      const data = await this.Get(
        `api/FoodStep/GetFoodStepList?FoodId=${foodId}`
      );
      if (data.code == "Ok") {
        this.foodStepList = data.data;
      } else {
        this.$toast.error(
          "Lỗi hiển thị các giai đoạn nấu ăn rồi bạn đợi một chút nhé !",
          {
            autoClose: 1000,
          }
        );
      }
    },
    async getUserInf() {
      let foodId = this.$route.query.page;
      const data = await this.Get(`api/Food/GetUserInFood?foodId=${foodId}`);
      if (data.code == "Ok") {
        this.user = data.data;
      } else {
        this.$toast.error("Lỗi hiển thị tên rồi bạn đợi một chút nhé !", {
          autoClose: 1000,
        });
      }
    },
  },
};
</script>

<style></style>
