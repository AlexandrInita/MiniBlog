<template>
	<v-row justify="center">
    <v-dialog v-model="dialog" persistent  width="700">
      <v-card>
        <v-card-title class="text-h5">
          {{post && post.id ? 'Редактирование нового поста' : 'Добавление нового поста'}}
        </v-card-title>
        <v-card-text>
          <label class="ml-2"><strong>Заголовок</strong></label>
          <v-text-field
            v-model="post.title"
            class="mt-1 rounded-lg"
            outlined dense clearable
          />

          <label class="ml-2"><strong>Короткий текст</strong></label>
          <v-text-field
            v-model="post.shorttext"
            class="mt-1 rounded-lg"
            outlined dense clearable
          />

          <label class=" ml-2"><strong>Текст</strong></label>
          <v-textarea
            v-model="post.text"
            class="mt-1 rounded-lg"
            outlined no-resize clearable
          />
        </v-card-text>

        <v-card-actions class="pb-4 d-flex justify-end">
          <v-img v-if="validator" src="@/assets/validator.webp" :width="300"/>

          <v-btn class="px-3" color="primary" outlined @click="closeDialog">
            <v-icon dark>mdi-close</v-icon>
            <span class="btn-text">Отменить</span>
          </v-btn>
          <v-btn class="px-3" color="primary" @click="post && post.id ? editPost(): addPost()">
            <v-icon dark>{{post && post.id ? 'mdi-pencil-outline' : 'mdi-plus'}}</v-icon>
            <span class="btn-text">{{post && post.id ? 'Редактировать' : 'Добавить'}}</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { PostClass } from '@/models'

export default {
  name: 'AddEditPostDialog',

	props: {
		dialog: Boolean,
    editablePost: Object,
  },
  
  data() {
    return{
      posts: [],
      post: new PostClass(),
      validator: false,
    }
  },

  methods: {
    addPost() {
      if (this.post.title && this.post.shorttext && this.post.text)
      {
        this.post.id = Date.now()
        this.$emit('addPost', this.post)
        this.closeDialog()
      }
      else {
        this.validator = true
      }
    },

    editPost() {
      if (this.post.title && this.post.shorttext && this.post.text)
      {
        this.$emit('editPost', this.post)
        this.closeDialog()
      }
      else {
        this.validator = true
      }
    },

    resetModal() {
      this.validator = false
      this.post = new PostClass()
    },

    closeDialog() {
      this.resetModal()
      this.$emit('closeDialog')
    }
  },

  watch: {
    editablePost(val) {
      if(val) {
        this.post = JSON.parse(JSON.stringify(val))
      }
    }
  }
}
</script>

<style scoped>
.btn-text {
  font-weight: 500;
  line-height: 19px;
  text-transform: none;
  letter-spacing: normal;
}
</style>
