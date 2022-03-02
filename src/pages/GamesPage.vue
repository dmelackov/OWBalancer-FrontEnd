<template>
    <div class="content">
        <p class="indev">В разработке :/</p>
    </div>
</template>

<script>
export default {
    components: {},
    methods: {},
};
</script>


<style scoped>
@import "../assets/css/global.css";
.content {
    height: 100%;
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.indev {
    width: 99vw;
    height: 100%;
    font-size: 8.1vw;
    text-align: center;
    margin: 0;
}
</style>