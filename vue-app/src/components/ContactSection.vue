<template>
  <section id="contact" class="section contact-section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">05</span>
        <h2 class="section-title">建立连接</h2>
        <span class="section-line"></span>
      </div>
      <div class="contact-card reveal" v-reveal>
        <p class="contact-lead">有没有想一起做的事？</p>
        <a class="contact-mail" :href="'mailto:' + site.email">{{ site.email }}</a>
        <div class="socials">
          <a
            v-for="s in site.socials"
            :key="s.name"
            class="social"
            :href="s.href"
            target="_blank"
            rel="noopener"
            :aria-label="s.name"
          >{{ s.icon }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
</script>
