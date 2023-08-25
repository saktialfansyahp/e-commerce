<template>
  <v-app-bar app>
    <v-row align="center" justify="space-between">
      <v-col>
        <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      </v-col>
      <v-col>
        <v-img :src="profilePicture" class="profile-picture" contain></v-img>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    breadcrumbs: Array,
    profilePicture: String,
  },
};
</script>

<style>
.profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
