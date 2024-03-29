<template>
    <Head>
        <Meta name="description" content="Models and data visualization from ESPN Analytics. March Madness, receiver tracking metrics and more." />
        <Meta property="og:description" content="Models and data visualization from ESPN Analytics. March Madness, receiver tracking metrics and more." />
        <Meta property="og:image" content="https://ea-images-hosting.s3.amazonaws.com/black_475.png"/>
        <Meta property="og:image:alt" content="ESPN Analytics"/>
        <Meta property="og:image:secure_url" content="https://ea-images-hosting.s3.amazonaws.com/black_475.png"/>
        <Meta name="twitter:image" content="https://ea-images-hosting.s3.amazonaws.com/black_475.png"/>
        <!-- <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" /> -->
        <Meta property="og:type" content="website" />
        <!-- <meta name="twitter:site" content="espn" /> -->
        <Meta name="twitter:description" content="Models and data visualization from ESPN Analytics. March Madness, receiver tracking metrics and more." />
        <Meta name="twitter:card" content="summary"/>
        <Meta name="twitter:creator" content="@sportsdada" />
        <!-- <meta name="twitter:app:name:iphone" content="ESPN"/>
        <meta name="twitter:app:name:googleplay" content="ESPN"/>
        <meta name="twitter:app:id:googleplay" content="com.espn.score_center"/> -->
        <Meta name="medium" content="index" />
        
    </Head>
    <slot></slot>
</template>

<script setup>
useHead({
    script: [
        {
            type: "application/ld+json",
            children: {
                "@context": "https://schema.org",
                "@type":    "WebSite",
                "name":     "ESPN Analytics",
                "url":      "https://www.espnanalytics.com/",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://www.espnanalytics.com/search/_/q/{search_term_string}?ex_cid=google_sitelinks"
                    },
                    "query-input": "required name=search_term_string"
                }     
            }
        }, 
        {
            type: "application/ld+json",
            children: {
                "@context": "http://schema.org",
                "@id": "https://www.espnanalytics.com/#organization",
                "@type": "Organization",
                "name": "ESPN Analytics",
                "url": "https://www.espnanalytics.com/",
                "logo": "https://ea-images-hosting.s3.amazonaws.com/black_475.png",
		}
        }
    ]
})
// useSeoMeta({
//     // title: 'ESPN Analytics',
//     description: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
//     ogTitle: 'ESPN Analytics',
//     ogDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
//     ogImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
//     ogImageUrl: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
//     twitterTitle: 'ESPN Analytics',
//     twitterDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
//     twitterImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
//     twitterCard: 'summary'
// })

// useServerSeoMeta({
//     // title: 'ESPN Analytics',
//     description: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
//     ogTitle: 'ESPN Analytics',
//     ogDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
//     ogImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
//     ogImageUrl: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
//     twitterTitle: 'ESPN Analytics',
//     twitterDescription: 'Models and data visualization from ESPN Analytics! March Madness, receiver tracking metrics and more.',
//     twitterImage: 'https://ea-images-hosting.s3.amazonaws.com/black_475.png',
//     twitterCard: 'summary'
// })

// useHead({
//  htmlAttrs: {
//     lang: 'en'
//  },
//  link: [
//     {
//     rel: 'icon',
//     type: 'image/ico',
//     href: '/favicon.ico'
//     }
// ]
// })
</script>