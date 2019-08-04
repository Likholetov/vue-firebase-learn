<template>
  <v-container
    fluid
    fill-height
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm8
        md4
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Вход</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
            >
              <v-text-field
                label="Электронная почта"
                v-model="email"
                :rules="emailRules"
                required
                prepend-icon="person"
                type="text"
              ></v-text-field>

              <v-text-field
                id="password"
                label="Пароль"
                v-model="password"
                :rules="passwordRules"
                required
                prepend-icon="lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary">Войти</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Это поле обязательно для заполнения',
        v => /.+@.+\..+/.test(v) || 'Пожалуйста введите настоящий адрес электронной почты',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Это поле обязательно для заполнения'
      ],
    }),
  }
</script>
