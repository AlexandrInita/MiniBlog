<template>
  <div class="mt-2 d-flex justify-center">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card tile class="elevation-1">
  
            <v-btn class="mt-2 ml-2" color="primary" text @click="$router.go(-1)">
              <v-icon dark size="20">mdi-arrow-left</v-icon> 
              <span class="btn-text">Назад</span>
            </v-btn>
            
            <v-card-title>
              <h2>{{ post.title }}</h2>
            </v-card-title>

            <v-card-text>
              <div class="px-2 postText overflow-auto">
                {{ post.text }}
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-card elevation="1">
            <v-card-text>
              <div class="px-2 commentsList overflow-auto">
                <div class="mt-4" v-for="(comment, index) in post.comments" :key="index">
                  <div class="d-flex justify-space-between">
                    <h3>{{ comment.name }}</h3>
                    <v-btn icon small @click="deleteComment(index)">
                      <v-icon dark> mdi-delete-outline </v-icon>
                    </v-btn>
                  </div>

                  <div>{{ comment.text }}</div>
                  <v-divider />
                </div>

                <div v-if="!post.comments || !post.comments.length">
                  Нет комментариев
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card elevation="1">
            <v-card-text>
              <label class="ml-2"><strong>Имя комментатора</strong></label>
              <v-text-field
                v-model="comment.name"
                class="mt-1 mb-2 rounded-lg"
                outlined dense hide-details="" clearable
              />
              <label class="ml-2"><strong>Комментарий</strong></label>
              <v-textarea
                v-model="comment.text"
                class="mt-1 rounded-lg"
                outlined no-resize hide-details clearable
                rows="3"
              >
                <template slot="append">
                  <v-icon @click="addComment">mdi-send</v-icon>
                </template>
              </v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "ReadPostPage",

  mounted() {
    this.downloadFromLocalStorage();
    this.FindSelectedPost();
    document.title = this.post.title;
  },

  data() {
    return {
      comment: {
        name: null,
        text: null,
      },
      post: [],
      posts: [],
    };
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    addComment() {
      this.post.comments.push(this.comment);
      this.comment = {
        name: null,
        text: null,
      };
      this.updateLocalStorage();
    },

    deleteComment(id) {
      this.post.comments.splice(id, 1);
      this.updateLocalStorage();
    },

    FindSelectedPost() {
      this.post = this.posts.find((el) => el.id == this.id);
    },

    updateLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },

    downloadFromLocalStorage() {
      this.posts = JSON.parse(localStorage.getItem("posts"));
    },
  },
};
</script>

<style scoped>
.commentsList {
  height: 194px;
}

.postText {
  height: 200px;
}
</style>
