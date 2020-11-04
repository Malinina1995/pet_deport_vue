<template>
    <div>
        <my-header :cartItemCount="cartItemCount"></my-header>
        <div class="row content" v-for="product in sortedProducts" :key="product.id">
            <div class="card mb-3">
                <img class="card-img-top cart-image_center" :src="'assets/images/' + product.image"
                     alt="Card image">
                <div class="card-body">
                    <router-link tag="h1"
                                 :to="{ name: 'Id', params: { id:product.id } }">
                        {{ product.title }}
                    </router-link>
                    <p v-html="product.description"></p>
                    <p class="price">{{ product.price | formatPrice }}</p>
                    <button class="btn btn-primary" @click="addToCart(product)" v-if="canAddToCart(product)">
                        Add to cart
                    </button>
                    <button class="btn btn-primary disabled" aria-disabled="true" v-else>
                        Add to cart
                    </button>
                    <transition name="bounce" mode="out-in">
                          <span class="inventory-message"
                                v-if="product.availableInventory - cartCount(product.id) === 0"
                                key="0">
                                All Out!
                          </span>
                        <span class="inventory-message"
                              v-else-if="product.availableInventory - cartCount(product.id) < 5"
                              key="">
                            Only {{ product.availableInventory - cartCount(product.id) }} left!
                          </span>
                        <span class="inventory-message"
                              v-else key="">Buy Now!
                          </span>
                    </transition>
                    <div class="rating">
                        <span :class="{'rating-active': checkRating(n, product)}" v-for="n in 5" :key="n">☆</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MyHeader from './Header'
import axios from "axios";

export default {
    name: "iMain",
    components: {
        MyHeader
    },
    data() {
        return {
            products: {},
            cart: [],
        }
    },
    created() {
        axios.get('/products.json')
            .then(res => {
                this.products = res.data.products;
            })
    },
    computed: {
        cartItemCount() {
            return this.cart.length || 0;
        },
        sortedProducts() {
            if (this.products.length) {
                let productsArray = this.products.slice(0);
                return productsArray.sort(this.compare)
            }
            return []
        }
    },
    filters: {
        formatPrice(price) {
            if (!parseInt(price)) {
                return "";
            }
            if (price > 99999) {
                var priceString = (price / 100).toFixed(2);
                var priceArray = priceString.split("").reverse();
                var index = 3;
                while (priceArray.length > index + 3) {
                    priceArray.splice(index + 3, 0, ",");
                    index += 4;
                }
                return "$" + priceArray.reverse().join("");
            } else {
                return "$" + (price / 100).toFixed(2);
            }
        }
    },
    methods: {
        addToCart(product) {
            this.cart.push(product.id)
        },
        checkRating(n, myProduct) {
            return myProduct.rating - n >= 0;
        },
        canAddToCart(product) {
            return product.availableInventory > this.cartCount(product.id)
        },
        cartCount(id) {
            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++
                }
            }
            return count
        },
        compare(a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            }
            return 0
        }
    }
}
</script>

<style scoped>
.bounce-enter-active {
    animation: shake 0.72s cubic-bezier(.37, .07, .19, .97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
}

@keyframes shake {
    10%, 90% {
        color: red;
        transform: translate3d(-1px, 0, 0);
    }
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }
    30%, 50%, 70% {
        color: red;
        transform: translate3d(-4px, 0, 0);
    }
    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
}
</style>