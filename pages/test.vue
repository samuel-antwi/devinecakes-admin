<script setup lang="ts">
import { useScroll } from "@vueuse/core";

const el = ref<HTMLElement | null>(null);
const scroll = useScroll(el);
const { x, y, isScrolling, arrivedState, directions } = useScroll(el, {
  behavior: "smooth",
});
</script>

<template>
  <div ref="el" class="h-[1600px]">
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium esse
      quae, expedita nisi eum et illum nobis magnam mollitia dignissimos
      necessitatibus alias nesciunt molestiae iste dolorum, modi eius similique.
      Dolores distinctio, fugiat officia dolorem, dignissimos, sed corporis
      inventore laudantium suscipit optio aperiam quae autem iure nobis non
      veritatis expedita esse exercitationem nisi quaerat rem. Necessitatibus
      ullam mollitia, vel nam illo accusantium cupiditate maiores corrupti rem
      qui voluptate blanditiis nostrum eligendi tenetur nulla, enim repellendus
      expedita rerum odio recusandae deserunt velit? Nulla tempora libero
      recusandae. Eaque maxime vel explicabo error, totam quaerat a? Minima
      doloremque vel dolorem distinctio nesciunt veritatis saepe?
    </div>
    <div class="w-3/6 h-3/6">
      <pre>
            {{ scroll }}
        </pre
      >
    </div>
    <div>
      <UButton @click="($event) => (y += 50)">Scroll Up</UButton>
      <UButton @click="($event) => (y -= 50)">Scroll Down</UButton>
    </div>
  </div>
</template>
