<template>
  <body class="h-full">
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                v-model="username"
                autocomplete="email"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Password</label
              >
              <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >Forgot password?</a
                >
              </div>
            </div>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                autocomplete="current-password"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          {{ " " }}
          <a
            href="#"
            class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >Start a 14 day free trial</a
          >
        </p>
      </div>
    </div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="closeModals">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-300"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="fixed transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="bg-white px-4 pb-2 pt-5 sm:p-6 sm:pb-4">
                  <div class="flex sm:flex sm:items-center">
                    <div class="mx-auto text-center sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        class="text-base font-semibold leading-6 text-gray-900"
                        >{{ message }}</DialogTitle
                      >
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          {{ messageDesc }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                >
                  <button
                    type="button"
                    class="mt-0 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    @click="closeModals"
                    ref="cancelButtonRef"
                  >
                    Oke
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </body>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
// import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
</script>

<script>
import axios from "axios";
// import { getCookie } from "/cookie";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      token: "",
      message: "",
      messageDesc: "",
    };
  },
  computed: {
    open() {
      return this.$store.state.openModals;
    },
  },
  methods: {
    closeModals() {
      this.$store.state.openModals = false;
    },
    ...mapActions(["login"]),
    submitForm() {
      if (!this.username || !this.password) {
        // Tampilkan pesan kesalahan jika email atau password kosong
        this.message = "Email and password are required.";
        this.messageDesc = "Please fill in both fields before proceeding.";
        this.$store.state.openModals = true;
        return;
      }
      const credentials = {
        username: this.username,
        password: this.password,
      };
      this.login(credentials)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          // this.open = true;
          console.log(error.response.data.message);
          this.message = "Invalid Email or Password.";
          this.messageDesc =
            "The email and password combination you entered is incorrect. Please double-check your email and password and try again.";
        });
    },
    // async login() {
    //   const data = {
    //     username: this.username,
    //     password: this.password,
    //   };
    //   try {
    //     const response = await axios.post("http://localhost:8080/login", data);
    //     localStorage.setItem("token", response.data.token);
    //     localStorage.setItem("role", response.data.data.Role.name);
    //     localStorage.setItem("isLoggedIn", true);

    //     this.$router.push("/");
    //     // location.reload();
    //   } catch (error) {
    //     console.error(error);
    //     this.open = true;
    //   }
    // },
    product() {
      axios
        .get("http://localhost:8080/api/admin/product")
        .then((response) => {
          // localStorage.setItem("access_token", response.data.access_token);
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          // this.errorMessage = error.response.data.error;
        });
    },
  },
};
</script>
