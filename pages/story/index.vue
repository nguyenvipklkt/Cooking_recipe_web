<template>
  <div class="h-100 w-100">
    <div
      class="h2 p-4 d-flex justify-content-center"
      style="font-family: Florence, cursive"
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
      style="text-align: center; font-family: Florence, cursive"
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
        <div class="d-flex justify-content-center my-5">
          <div class="d-flex justify-content-between" style="width: 700px">
            <div class="d-flex">
              <div class="me-3 d-flex align-items-center">
                <font-awesome-icon icon="clock" style="font-size: 40px" />
              </div>
              <div>
                <div style="font-size: 15px; font-weight: 600">Chuẩn bị</div>
                <div>{{ food.preparationTime + " Phút" }}</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="me-3 d-flex align-items-center">
                <font-awesome-icon icon="kitchen-set" style="font-size: 40px" />
              </div>
              <div>
                <div style="font-size: 15px; font-weight: 600">Nấu nướng</div>
                <div>{{ food.cookingTime + " Phút" }}</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="me-3 d-flex align-items-center">
                <font-awesome-icon icon="bowl-food" style="font-size: 40px" />
              </div>
              <div>
                <div style="font-size: 15px; font-weight: 600">Khẩu phần</div>
                <div>{{ food.meal + " Người" }}</div>
              </div>
            </div>
            <div class="d-flex">
              <div class="me-3 d-flex align-items-center">
                <font-awesome-icon icon="5" style="font-size: 40px" />
              </div>
              <div>
                <div style="font-size: 13px; font-weight: 600">Độ khó</div>
                <div>{{ food.levelOfDifficult + "/5" }}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="h3 mb-4">{{ "Video hướng dẫn : " }}</div>
          <video
            width="640"
            height="360"
            :src="[formatImage(food.video)]"
            controls
            class="mb-4"
            type="video/mp4"
          ></video>
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
      <form action="" class="d-flex" v-on:submit.prevent="comment()">
        <input
          type="text"
          style="
            resize: none;
            width: 800px;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            outline: none;
            border: 1px solid #dee2e6;
          "
          class="ps-3"
          placeholder="Nhớ để lại bình luận để cải thiện bài viết hơn nhé bạn !"
          v-model="content"
        />
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
    <div class="d-flex justify-content-center mt-4">
      <div>
        <div v-for="cm in commentList">
          <div class="d-flex align-items-center mb-3">
            <NuxtLink
              :to="{
                path: checkUser(cm.userId),
                query: { page: cm.userId },
              }"
            >
              <img
                class="me-2"
                :src="[formatImage(cm.avatar)]"
                alt=""
                style="width: 50px; border-radius: 50%; border: 5px solid #fff"
              />
            </NuxtLink>
            <NuxtLink
              :to="{
                path: checkUser(cm.userId),
                query: { page: cm.userId },
              }"
              style="text-decoration: none; color: #000"
            >
              <div class="me-5 h6">{{ cm.firstName + " " + cm.lastName }}</div>
              <div v-if="checkAuthor(cm.userId)" class="h6">Tác giả</div>
            </NuxtLink>
            <div
              style="border: 1px solid #000; border-radius: 8px; width: 600px"
              class="px-4 py-2 d-flex justify-content-between"
            >
              <div>{{ cm.content }}</div>
              <div @click="deleteComment(cm.id)" class="comment-trash">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </div>
            </div>
          </div>
        </div>
      </div>
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
    await this.getComment();
  },
  data() {
    return {
      food: {},
      ingredientList: {},
      foodStepList: {},
      user: {},
      content: "",
      commentList: {},
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
    async comment() {
      const commentRequest = {
        foodId: this.$route.query.page,
        content: this.content,
      };
      const data = await this.Post("api/Review/CreateComent", commentRequest);
      if (data.code == "Ok") {
        this.$toast.success("Đã bình luận về bài viết này !", {
          autoClose: 1000,
        });
        setTimeout(() => {
          reloadNuxtApp();
        }, 1000);
      } else {
        this.$toast.error("Bình luận thất bại !", {
          autoClose: 2000,
        });
      }
    },
    async getComment() {
      const data = await this.Get(
        `api/Review/GetListComment?foodId=${this.$route.query.page}`,
        {}
      );
      if (data.code == "Ok") {
        this.commentList = data.data;
      } else {
        this.$toast.error("Lấy bình luận thất bại !", {
          autoClose: 2000,
        });
      }
    },
    checkUser(id) {
      var userInStorage = JSON.parse(localStorage.getItem("user"));
      if (id != userInStorage.id) {
        return "/user";
      }
      return "/profile";
    },
    async deleteComment(id) {
      const data = await this.Delete(
        `api/Review/DeleteComment?commentId=${id}`,
        {}
      );
      if (data.code == "Ok") {
        this.$toast.success("Xoá bình luận thành công !", {
          autoClose: 2000,
        });
        setTimeout(() => {
          reloadNuxtApp();
        }, 1000);
      } else {
        this.$toast.error("Bạn không đủ quyền để xoá !", {
          autoClose: 2000,
        });
      }
    },
    checkAuthor(CommentId) {
      if (this.user.id == CommentId) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
.comment-trash {
  border-radius: 50%;
  padding: 4px 10px 4px 10px;
}
.comment-trash:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
</style>
