<template>
  <section id="about" class="section page">
    <div class="container">
      <div class="section-head reveal" v-reveal>
        <span class="section-index">04</span>
        <h2 class="section-title">关于我</h2>
        <span class="section-line"></span>
      </div>
      <div class="about-grid">
        <div class="about-card reveal" v-reveal>
          <div class="avatar">
            <span>{{ site.initial }}</span>
          </div>
          <ul class="facts">
            <li v-for="f in site.facts" :key="f.k">
              <span class="k">{{ f.k }}</span>
              <span class="v">{{ f.v }}</span>
            </li>
          </ul>
        </div>
        <div class="about-text reveal" v-reveal>
          <p>
            你好，我是<strong class="accent">{{ site.name }}</strong>。桂林电子科技大学计算机科学与技术（本科）在读，热衷于用技术把想法点亮——从一行代码到一个完整产品，专注 AI 应用与全栈开发，享受探索、拆解与重构的过程。
          </p>
          <p>我相信优秀的产品来自对细节的执着与对用户的理解。不设限，是让我持续前进的燃料。</p>
          <a href="#contact" class="text-link" @click.prevent="emit('go', 'contact')">一起聊聊 →</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { site } from "../data/site";
const emit = defineEmits(["go"]);
</script>
