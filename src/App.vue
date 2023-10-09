<template>
  <v-app>
    <v-card v-if="isLoggedIn && role == 'admin'">
      <v-navigation-drawer v-model="drawer" :rail="rail" @click="rail = false">
        <v-list-item
          height="64"
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav class="my-4">
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            value="home"
            to="/"
            :active="activeRoute == 'Home'"
          ></v-list-item>
          <v-list-item
            to="/about"
            prepend-icon="mdi-account"
            title="My Account"
            value="account"
            :active="activeRoute == 'About'"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group-outline"
            title="Product"
            value="product"
            to="/product"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="white" style="overflow: visible">
        <v-app-bar-nav-icon
          v-if="isDesktop == true"
          @click="rail = !rail"
        ></v-app-bar-nav-icon>
        <v-app-bar-nav-icon
          v-else
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="hidden sm:block">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  href="#"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    class="w-3 h-3 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                    />
                  </svg>
                  Home
                </a>
              </li>
              <li v-if="history" aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    @click="link"
                    class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                  >
                    {{ history }}
                    <!-- <span
                      class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                      >{{ activeRoute }}</span
                    > -->
                  </a>
                </div>
              </li>
              <li v-if="activeRoute != 'Home'" aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span
                    class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                    >{{ activeRoute }}</span
                  >
                </div>
              </li>
            </ol>
          </nav>
        </v-toolbar-title>
        <v-toolbar-title class="sm:hidden">
          <div class="flex items-center">
            <span
              class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
              >{{ activeRoute }}</span
            >
          </div>
        </v-toolbar-title>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            type="button"
            class="relative rounded-full p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3 me-4">
            <div>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    @click="handleLogout"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </v-app-bar>
      <v-main style="min-height: 100vh">
        <router-view></router-view>
      </v-main>
    </v-card>
    <v-card v-else-if="isLoggedIn && role == 'user'" style="min-height: 100vh">
      <header>
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
          <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
              <div
                class="absolute inset-y-0 left-0 flex items-center sm:hidden"
              >
                <!-- Mobile menu button-->
                <DisclosureButton
                  class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span class="absolute -inset-0.5" />
                  <span class="sr-only">Open main menu</span>
                  <Bars3Icon
                    v-if="!open"
                    class="block h-6 w-6"
                    aria-hidden="true"
                  />
                  <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
              </div>
              <div
                class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
              >
                <div class="flex flex-shrink-0 items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div class="hidden sm:ml-6 sm:block">
                  <div class="flex space-x-4">
                    <a
                      v-for="item in navigation"
                      :key="item.name"
                      :href="item.href"
                      :class="[
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                      :aria-current="item.current ? 'page' : undefined"
                      >{{ item.name }}</a
                    >
                  </div>
                </div>
              </div>
              <div
                class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
              >
                <button
                  type="button"
                  class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">View notifications</span>
                  <ShoppingCartIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Profile dropdown -->
                <Menu as="div" class="relative ml-3">
                  <div>
                    <MenuButton
                      class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span class="absolute -inset-1.5" />
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </MenuButton>
                  </div>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <MenuItem v-slot="{ active }">
                        <a
                          href=""
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >Your Profile</a
                        >
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a
                          href="#"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >Settings</a
                        >
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <a
                          href="#"
                          @click="handleLogout"
                          :class="[
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ]"
                          >Sign out</a
                        >
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
              <DisclosureButton
                v-for="item in navigation"
                :key="item.name"
                as="a"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</DisclosureButton
              >
            </div>
          </DisclosurePanel>
        </Disclosure>
      </header>
      <router-view></router-view>
    </v-card>
    <v-card style="min-height: 100vh" v-else>
      <router-view></router-view>
    </v-card>
  </v-app>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { BellIcon } from "@heroicons/vue/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
</script>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      rail: false,
      viewportWidth: window.innerWidth,
      // isDesktop: "",
      fav: true,
      menu: false,
      message: false,
      hints: true,
      // solutions,
      // callsToAction,

      //
    };
  },
  components: {},
  computed: {
    history() {
      return this.$store.state.history;
    },
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    role() {
      return this.$store.state.role;
    },
    isDesktop() {
      return this.$store.state.isDesktop;
    },
    activeRoute() {
      return this.$route.name;
    },
    navigation() {
      return this.$router.options.routes
        .filter(
          (route) =>
            route.name != "/" &&
            route.name != "Sign In" &&
            route.name != "Add Product" &&
            route.name != "Sign Up" &&
            route.name != "Edit Product"
        )
        .map((route) => {
          return {
            name: route.name,
            href: "/#" + route.path,
            current: this.$route.name === route.name,
          };
        });
    },
  },
  methods: {
    link() {
      this.$router.push({ name: this.history });
      this.$store.state.history = null;
      localStorage.removeItem("history");
    },
    ...mapMutations(["setIsDesktop"]),
    handleResize() {
      const width = window.innerWidth;
      if (width < 1280) {
        this.setIsDesktop(false);
      } else {
        this.setIsDesktop(true);
      }
    },
    toggleNavigation() {
      this.drawer = !this.drawer;
    },
    toggleRail() {
      this.rail = !this.rail;
    },
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout()
        .then(() => {
          this.$router.push("/signin");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
