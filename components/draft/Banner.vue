<template>
    <div class="navbar h-[194px] md:h-[175px]" ref="prePage">
        <div class="flex flex-col justify-between items-center h-[153px] pt-[28px] md:h-[132px] md:pt-[33px]">
            <a href="/">
                <img class="ea w-[78px]" src="@/assets/ea3.png" />
            </a>
            <div class="banner-text h-[80px] md:h-[40px] text-white text-center text-5xl w-[222px] md:w-full leading-10">NFL DRAFT 2024 SIMULATOR</div>
            <div class="hidden md:block text-white h-[12px] text-[11px] font-light">Driven by the <a class="underline underline-offset-2 font-normal" href="/">Draft Day Predictor Model</a></div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'Tungsten-Black';
    src: url('~/assets/fonts/Tungsten-Black.otf') format('opentype');
}
.navbar {
    background: radial-gradient(50% 50% at 50% 50%, #004E7B 0%, #002236 85%);
}
.banner-text {
    font-family: Tungsten-Black;
}
/* .driven-text {
    font-family: "SF Pro Text"
} */
/* .ea {
    width: 100px;
} */
/* @media only screen and (max-width: 699px) {
} */
</style>