<template>
	<v-row justify="center">
    <v-dialog v-model="dialog" persistent  width="400">
      <v-card>
        <v-card-title class="text-h5">Параметры пользователя</v-card-title>
        
        <v-card-text>
          <label class="ml-2"><strong>Пользовательское имя</strong></label>
          <v-text-field
            v-model="dialogUser.userName"
            class="mt-1 rounded-lg"
            outlined dense clearable
            :error-messages="errorMessages.userName"
            @change="$v.dialogUser.userName.$touch()"
          />

          <label class="ml-2"><strong>Роли</strong></label>
          <v-autocomplete
            v-model="dialogUser.roles"
            :items="roles"
            class="mt-1 rounded-lg"
            outlined dense chips deletable-chips hide-details small-chips multiple
          />
        </v-card-text>

        <v-card-actions class="pb-4 d-flex justify-end">
          <v-btn 
            outlined class="px-3" color="primary" 
            :disabled="$v.$invalid"
            @click="setUser"
          >   
            <v-icon dark size="20">mdi-check-bold</v-icon>
            <span class="ml-2 btn-text">Сохранить</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, maxLength } from 'vuelidate/lib/validators'
import { errorMessage } from '@/scripts'
import { User } from '@/models'
import { mapGetters } from 'vuex'

export default {
  name: 'SetUserDialog',

	props: {
		dialog: Boolean,
  },

  mounted() {
    this.dialogUser = User.generateUser(this.userName)
  },
  
  data() {
    return{
      dialogUser: new User,

      roles: ['Админ' , 'Модератор', 'Читатель']
    }
  },

  validations: {
    dialogUser: {
      userName: { required, maxLength: maxLength(20)},
    },
  },

  computed: {
    ...mapGetters('user', ['userName']),

    errorMessages() {
      let errors = []

      Object.keys(this.$v.dialogUser.$params).forEach(key => {
        errors[key] = errorMessage(this.$v.dialogUser[key])
      })
      return errors
    }
  },

  methods: {
    setUser() {
      this.$store.commit('user/setUser', this.dialogUser)
      this.closeDialog()
    },

    resetModal() {
      this.dialogUser = new User()
      this.$v.dialogUser.$reset()
    },

    closeDialog() {
      this.resetModal()
      this.$emit('closeDialog')
    }
  },
}
</script>

<style scoped>
</style>
