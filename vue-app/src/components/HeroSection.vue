<template>
  <section id="hero" class="section hero page">
    <div class="hero-orbit" aria-hidden="true">
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="orbit orbit-3"></div>
    </div>
    <div class="hero-content">
      <div class="hero-grid">
        <div class="hero-left">
          <p class="hero-badge" v-reveal>
            <span class="badge-dot"></span> GREETINGS FROM <span class="accent">EARTH-1</span>
          </p>
          <figure class="hero-avatar">
            <img src="/avatar.jpg" :alt="site.name + '的头像'" />
          </figure>
          <h1 class="hero-title">
            <span class="line">HI, I'M</span>
            <span class="line name">{{ site.name }}<span class="cursor">_</span></span>
          </h1>
        </div>
        <div class="hero-right">
          <p class="hero-role">
            <span class="hero-facts">
              <span v-for="f in infoItems" :key="f.k" class="facts-item">
                <b>{{ f.k }}：</b>
                <a v-if="f.k === '邮箱'" :href="'mailto:' + f.v">{{ f.v }}</a>
                <span v-else>{{ f.v }}</span>
              </span>
            </span>
          </p>
          <p class="hero-desc">{{ site.desc }}</p>
          <div class="hero-actions">
            <a href="#projects" class="btn btn-primary" @click.prevent="emit('go', 'projects')">
              <span>查看作品</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </a>
            <a href="#contact" class="btn btn-ghost" @click.prevent="emit('go', 'contact')">与我联系</a>
          </div>
          <div class="hero-meta">
            <span>【 位置 】<b>{{ site.facts[0] && site.facts[0].v }}</b></span>
            <span>【 技能栈 】<b>{{ site.skills.length }}</b> 项</span>
            <span>【 作品 】<b>{{ site.projects.length }}</b> 个</span>
          </div>
        </div>
      </div>
    </div>
    <a href="#skills" class="scroll-hint" aria-label="向下滚动" @click.prevent="emit('go', 'skills')">
      <span class="mouse"><span class="wheel"></span></span>
      <span class="hint-text">SCROLL</span>
    </a>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { site } from "../data/site";
const emit = defineEmits(["go"]);
const infoItems = computed(() => {
  const fact = (k) => (site.facts.find((f) => f.k === k) || {}).v || "";
  return [
    { k: "生日", v: site.birthday },
    { k: "院校", v: fact("院校") },
    { k: "电话", v: site.phone },
    { k: "外语", v: "大学英语四/六级（CET-4/6）" },
    { k: "邮箱", v: site.email },
    { k: "籍贯", v: fact("籍贯") },
  ];
});
</script>
