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
            :error-messages="errorMessages.title"
            @change="$v.post.title.$touch()"
          />

          <label class="ml-2"><strong>Короткий текст</strong></label>
          <v-text-field
            v-model="post.shortText"
            class="mt-1 rounded-lg"
            outlined dense clearable
            :error-messages="errorMessages.shortText"
            @change="$v.post.shortText.$touch()"
          />

          <label class=" ml-2"><strong>Текст</strong></label>
          <v-textarea
            v-model="post.text"
            class="mt-1 rounded-lg"
            outlined no-resize clearable
            :error-messages="errorMessages.text"
            @change="$v.post.text.$touch()"
          />
        </v-card-text>

        <v-card-actions class="pb-4 d-flex justify-end">
          <v-btn class="px-3" color="primary" outlined @click="closeDialog">
            <v-icon dark size="20">mdi-close</v-icon>
            <span class="btn-text">Отменить</span>
          </v-btn>
          <v-btn 
            class="px-3" color="primary" 
            :disabled="$v.$invalid"
            @click="post && post.id ? editPost(): addPost()"
          >
            <v-icon dark size="20">{{post && post.id ? 'mdi-pencil-outline' : 'mdi-plus'}}</v-icon>
            <span class="btn-text">{{post && post.id ? 'Редактировать' : 'Добавить'}}</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { PostClass } from '@/models'
import { required, maxLength } from 'vuelidate/lib/validators'
import { errorMessage } from '@/scripts'

export default {
  name: 'AddEditPostDialog',

	props: {
		dialog: Boolean,
    editablePost: Object,
  },
  
  data() {
    return{
      posts: [],
      post: new PostClass()
    }
  },

  validations: {
    post: {
      title: { required, maxLength: maxLength(20)},
      shortText: { required, maxLength: maxLength(50)},
      text: { required, maxLength: maxLength(10000)},
    },
  },

  computed: {
    errorMessages() {
      let errors = []

      Object.keys(this.$v.post.$params).forEach(key => {
        errors[key] = errorMessage(this.$v.post[key])
      })
      return errors
    }
  },

  methods: {
    addPost() {
      this.post.id = Date.now()
      this.$emit('addPost', this.post)
      this.closeDialog()
    },

    editPost() {
      this.$emit('editPost', this.post)
      this.closeDialog()
    },

    resetModal() {
      this.post = new PostClass()
      this.$v.post.$reset()
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
</style>
