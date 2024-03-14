<template>
    <slot></slot>
</template>

<script setup>
useSeoMeta({
    // title: 'ESPN Analytics',
    description: 'Models and data visualization from ESPN Analytics! 4th down decisions, receiver tracking metrics and more.',
    // ogTitle: 'ESPN Analytics',
    ogDescription: 'Models and data visualization from ESPN Analytics! 4th down decisions, receiver tracking metrics and more.',
    ogImage: 'https://ea-images-hosting.s3.amazonaws.com/black.png',
    ogUrl: 'https://espnanalytics.com',
    // twitterTitle: 'ESPN Analytics',
    twitterDescription: 'Models and data visualization from ESPN Analytics! 4th down decisions, receiver tracking metrics and more.',
    twitterImage: 'https://ea-images-hosting.s3.amazonaws.com/black.png',
    twitterCard: 'summary'
})

useHead({
 htmlAttrs: {
    lang: 'en'
 },
 link: [
    {
    rel: 'icon',
    type: 'image/png',
    href: '/favicon.png'
    }
]
})
</script>