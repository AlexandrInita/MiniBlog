<template>
  <div class="mt-2 d-flex justify-center">
      <v-container>
        <v-row>
          <v-col cols="12" class="pt-0">
            <v-card class="base-card postCard delay-03" ref="postCard">
              <v-btn class="mt-2 ml-2 rounded-lg" color="primary" text @click="goBack">
                <v-icon dark>mdi-chevron-left</v-icon> 
                <span class="btn-text">назад</span>
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

        <transition name="fade" mode="out-in">
          <v-row v-if="show">
            <v-col cols="12" md="6" v-if="isAdmin || isReader" class="mb-5">
              <v-card class="base-card" height="226">
                <v-card-text>
                  <label class="ml-2"><strong>Имя комментатора</strong></label>
                  <div class="ml-2 mb-2">{{ userName }}</div>
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
            
            <v-col cols="12" :md="(isAdmin || isReader) ? 6 :12" class="mb-5">
              <v-card class="base-card">
                <v-card-text>
                  <div class="px-2 commentsList overflow-auto">
                    <div class="mt-4" v-for="(comment, index) in post.comments" :key="index">
                      <div class="d-flex justify-space-between">
                        <h3>{{ comment.name }}</h3>
                        <v-btn 
                          v-if="isAdmin || isModerator || (isReader && comment.name === userName)"
                          icon small
                          @click="deleteComment(index)"
                        >
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
          </v-row>
        </transition>
      </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "ReadPostPage",

  mounted() {
    this.downloadFromLocalStorage();
    this.FindSelectedPost();
    document.title = this.post.title;

    this.comment.name = this.userName

    this.toShow()
    //
    window.scrollBy(0, 0)
    window.addEventListener("resize", this.onResize)
  },

  destroyed() {
    window.removeEventListener("resize", this.onResize)
  },

  data() {
    return {
      comment: {
        name: null,
        text: null,
      },
      post: [],
      posts: [],
      postCardCols: 3,
      show: false
    };
  },

  computed: {
    ...mapGetters('user', ['userName', 'isAdmin', 'isModerator', 'isReader']),

    id() {
      return this.$route.params.id;
    },
  },

  methods: {
    toShow() {
      this.show = true
      this.$nextTick(() => this.onResize())
    },

    goBack() {
      this.show = false

      if (this.$refs?.postCard) {
        this.$refs.postCard.$el.style.minHeight = '210px';
      }

      setTimeout(() =>  this.$router.go(-1), 300);
    },

    addComment() {
      this.comment.name = this.userName
      this.post.comments.push(Object.assign({},this.comment))
      this.comment.text = null
      this.updateLocalStorage()
    },

    deleteComment(id) {
      this.post.comments.splice(id, 1)
      this.updateLocalStorage()
    },

    FindSelectedPost() {
      this.post = this.posts.find((el) => el.id == this.id)
    },

    updateLocalStorage() {
      localStorage.setItem("posts", JSON.stringify(this.posts))
    },

    downloadFromLocalStorage() {
      this.posts = JSON.parse(localStorage.getItem("posts"))
    },

    onResize() {
      if (this.$refs?.postCard) {
        const otherElementheight = 400
   
        this.$refs.postCard.$el.style.minHeight = window.innerHeight - otherElementheight + 'px';
      }
    }
  },
};
</script>

<style scoped>
.delay-03 {
  transition: all 0.3s ease;
}

.commentsList {
   height: 194px;
}

.postCard {
  min-height: 210px; 
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter, .fade-leave-to
{
  opacity: 0;
}
</style>
