<template>
    <slot></slot>
</template>

<script setup>
useSeoMeta({
    // title: 'ESPN Analytics',
    description: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
    ogTitle: 'ESPN Analytics',
    ogDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
    ogImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
    ogImageUrl: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
    twitterTitle: 'ESPN Analytics',
    twitterDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
    twitterImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
    twitterCard: 'summary'
})

useServerSeoMeta({
    // title: 'ESPN Analytics',
    description: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
    ogTitle: 'ESPN Analytics',
    ogDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
    ogImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
    ogImageUrl: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
    twitterTitle: 'ESPN Analytics',
    twitterDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
    twitterImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
    twitterCard: 'summary'
})

useHead({
 htmlAttrs: {
    lang: 'en'
 },
 link: [
    {
    rel: 'icon',
    type: 'image/ico',
    href: '/favicon.ico'
    }
]
})
</script>