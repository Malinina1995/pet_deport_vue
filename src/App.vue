<template>
    <div id="app">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app',
}
</script>

<style>
/*@import "./assets/css/main.css";*/

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease-out;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    width: 200px;
    height: 200px;
}

.pr_10 {
    padding-right: 10px;
}

.cart-image_center {
    margin: 20px auto;
    width: 300px;
}

.icon_mr-10 {
    margin-right: 10px;
}

.inventory-message {
    margin-left: 20px;
    font-weight: bold;
    font-size: 120%;
}

.rating-active:before {
    content: "\2605";
    position: absolute;
}

.rating {
    display: inline;
    margin-left: 10px;
    margin-top: 10px;
    float: right;
}

.rating > span {
    display: inline-block;
    position: relative;
    width: 1.1em;
}
</style>
