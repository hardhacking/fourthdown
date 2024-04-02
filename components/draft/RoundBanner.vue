<template>
    <div class="round-ind">{{ getRoundNum(pick) }}</div>
</template>

<script>
  export default {
    props: {
        pick: Number, 
    }, 
    methods: {
        getRoundNum(pick) {
            switch(pick) {
                case 1:
                    return 'Round 1';
                case 32:
                    return 'Round 2';
                case 64:
                    return 'Round 3';
                case 103:
                    return 'Round 4';
                case 136:
                    return 'Round 5';
                case 178:
                    return 'Round 6';
                case 218:
                    return 'Round 7';
            }
        }
    }
  }
</script>

<style scoped>
    .round-ind {
        background-color: #393939;
        color: white;
        font-weight: bold;
    }

    @media only screen and (max-width: 699px) {
        .round-ind {
            width: 100%;
        }
    }
</style>