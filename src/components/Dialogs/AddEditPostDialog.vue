<template>
	<v-row justify="center">
        <v-dialog
        v-model="dialog"
        persistent
        width="700"
        >
        <v-card>
            <v-card-title class="text-h5">
            {{editablePost && editablePost.id ? 'Редактирование нового поста' : 'Добавление нового поста'}}
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="post.title"
                    label="Заголовок"
                    hide-details
                    clearable>
                </v-text-field>

                <v-text-field
                    v-model="post.shorttext"
                    label="Короткий текст"
                    hide-details
                    clearable>
                </v-text-field>

                <v-text-field
                    v-model="post.text"
                    label="Текст"
                    multiline
                    hide-details
                    clearable>
                </v-text-field>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-img v-if="validator"
                height="500"
                width="500"
                src="@/assets/validator.webp"
            />

            <v-btn
                color="green darken-1"
                text
                @click="closeDialog"
            >
                Отменить
            </v-btn>
            <v-btn
                v-if="!editablePost"
                color="green darken-1"
                text
                @click="addPost"
            >
                Добавить
            </v-btn>
             <v-btn
                v-else
                color="green darken-1"
                text
                @click="editPost"
            >
                Редактировать
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

    mounted(){
    },
    
    data() {
        return{
            posts: [],
            post: new PostClass(),
            validator: false,
        }
    },

    computed: {
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

</style>
