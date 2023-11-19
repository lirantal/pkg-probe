<script setup>
import { ref } from "vue";

const processing = ref(false);
const packageName = ref("vm2");
const packageVersion = ref("3.9.19");
const vulnerabilities = ref([]);

async function scanPackage() {
  processing.value = true;

  const BASE_URL = "http://localhost:3042";
  const httpResponseRaw = await fetch(
    `${BASE_URL}/test/vulnerabilities?packageName=${packageName.value}&packageVersion=${packageVersion.value}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  );

  const httpResponse = await httpResponseRaw.json();
  vulnerabilities.value = httpResponse.vulnerabilities;

  processing.value = false;
}
</script>

<template>
  <section class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-12">
        <h1
          class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900"
        >
          npm Package Security Scanner
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Scan an npm package for security vulnerabilities and get a report
        </p>
      </div>
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-full">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-600"
                >Package name</label
              >
              <input
                v-model="packageName"
                type="text"
                id="name"
                name="name"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-600"
                >Package version</label
              >
              <input
                v-model="packageVersion"
                type="text"
                id="version"
                name="version"
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div class="p-2 w-full">
            <button
              :disabled="processing"
              @click="scanPackage"
              class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Scan for security vulnerabilities
            </button>
          </div>

          <div
            v-if="vulnerabilities.length > 0"
            class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"
          >
            <div class="">
              <div
                v-for="(vulnerability, index) in vulnerabilities"
                :key="index"
                class="p-2 w-full"
              >
                <div class="bg-gray-100 rounded p-4 h-full items-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="3"
                    class="text-red-500 w-6 h-6 flex-shrink-0 mr-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                    ></path>
                  </svg>
                  <span class="title-font font-medium">
                    {{ vulnerability.id }}
                  </span>
                  <div class="">
                    <p class="">
                      {{ vulnerability.title }} in {{ vulnerability.package }}
                    </p>
                    <p>
                      <a
                        :href="vulnerability.url"
                        target="_blank"
                        class="text-indigo-500 inline-flex items-center"
                        >Learn More
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          class="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path></svg
                      ></a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"
          >
            <a class="text-indigo-500">playtronics@example.com</a>
            <p class="leading-normal my-5">
              Playtronics Corporate Headquarters, <br />
              Palo Alto, California
            </p>
            <span class="inline-flex">
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-4 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  ></path>
                </svg>
              </a>
              <a class="ml-4 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path
                    d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"
                  ></path>
                </svg>
              </a>
              <a class="ml-4 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  ></path>
                </svg>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

