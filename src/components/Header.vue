<template>
    <header
        class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h1 class="my-0 mr-md-auto font-weight-normal">
            <router-link :to="{name: 'iMain'}">{{ sitename }}</router-link>
        </h1>
        <div @click="showCheckout" class="btn btn-outline-primary"><i
            class="fas fa-shopping-cart icon_mr-10"></i><span class="pr_10">{{ cartItemCount }}</span>Checkout
        </div>

    </header>
</template>

<script>
export default {
    name: "my-header",
    data() {
        return {
            sitename: 'Pet Depot',
        }
    },
    props: [
        'cartItemCount'
    ],
    methods: {
        showCheckout() {
            this.$router.push({name: 'Form'})
        }
    }
}
</script>

<style scoped>

</style>