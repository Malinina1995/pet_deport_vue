<template>
    <div id="app">
        <header
            class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h1 class="my-0 mr-md-auto font-weight-normal" v-text="sitename"></h1>
            <div @click="showCheckout" class="btn btn-outline-primary"><i
                class="fas fa-shopping-cart icon_mr-10"></i>{{ cartItemCount }}
            </div>

        </header>
        <main>
            <template v-if="showProduct">
                <div class="row content" v-for="product in sortedProducts" :key="product.id">
                    <div class="card mb-3">
                        <img class="card-img-top cart-image_center" :src="product.image"
                             alt="Card image">
                        <div class="card-body">
                            <h1 v-text="product.title"></h1>
                            <p v-html="product.description"></p>
                            <p class="price">{{ product.price | formatPrice }}</p>
                            <button class="btn btn-primary" @click="addToCart(product)" v-if="canAddToCart(product)">
                                Add to cart
                            </button>
                            <button class="btn btn-primary disabled" aria-disabled="true" v-else>
                                Add to cart
                            </button>
                            <span class="inventory-message"
                                  v-if="product.availableInventory - cartCount(product.id) === 0">All out!</span>
                            <span class="inventory-message"
                                  v-else-if="product.availableInventory - cartCount(product.id) < 5">Only {{
                                    product.availableInventory - cartCount(product.id)
                                }} left!</span>
                            <span class="inventory-message"
                                  v-else>Buy now!</span>
                            <div class="rating">
                                <span :class="{'rating-active': checkRating(n, product)}" v-for="n in 5" :key="n">☆</span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else>
                <div class="container">
                    <h4 class="mb-3 col-md-6">Enter your information</h4>
                    <form class="container" novalidate="">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="firstName">First name</label>
                                <input type="text" class="form-control" id="firstName" placeholder=""
                                       value="" required="" v-model.trim="order.firstName">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="lastName">Last name</label>
                                <input type="text" class="form-control" id="lastName"
                                       placeholder="" value="" required="" v-model.trim="order.lastName">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="address">Address</label>
                            <input type="text" class="form-control" id="address" placeholder="Address"
                                   v-model.trim='order.address' required="">
                        </div>

                        <div class="mb-3">
                            <label for="address">City</label>
                            <input type="text" class="form-control" id="city" placeholder="City"
                                   v-model.trim='order.city' required="">
                        </div>

                        <div class="row">
                            <div class="col-md-5 mb-3">
                                <label for="state">State</label>
                                <select class="custom-select d-block w-100" id="state" v-model='order.state'
                                        required="">
                                    <option value="" disabled>State</option>
                                    <option v-for='(state, key) in states' :value="state" :key="key">{{ key }}</option>
                                </select>
                            </div>
                            <div class="col-md-3 mb-3">
                                <label for="zip">Zip / Postal code</label>
                                <input type="text" class="form-control" id="zip" v-model.number='order.zip'
                                       placeholder="" required="">
                            </div>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox"
                                   class="custom-control-input"
                                   id="gift"
                                   value="true"
                                   v-bind:true-value="order.sendGift"
                                   v-bind:false-value="order.dontSendGift"
                                   v-model="order.gift">
                            <label class="custom-control-label" for="gift">Ship as gift?</label>
                        </div>

                        <div class="d-block my-3">
                            <div class="custom-control custom-radio">
                                <input id="Home" name="paymentMethod"
                                       type="radio" :value="order.home" v-model="order.method"
                                       class="custom-control-input" checked="" required="">
                                <label class="custom-control-label" for="Home">Home</label>
                            </div>
                            <div class="custom-control custom-radio">
                                <input id="Business" name="paymentMethod"
                                       type="radio" :value="order.business"
                                       v-model="order.method"
                                       class="custom-control-input" required="">
                                <label class="custom-control-label" for="Business">Business</label>
                            </div>
                        </div>
                        <hr class="mb-4">
                        <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submitForm">Please
                            order
                        </button>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'App',
    data() {
        return {
            sitename: 'Pet Depot',
            showProduct: true,
            products: [],
            cart: [],
            order: {
                firstName: '',
                lastName: '',
                address: '',
                home: 'Home address',
                business: 'Business address',
                city: '',
                state: '',
                zip: '',
                method: 'Home',
                gift: 'Send as a gift',
                sendGift: 'Send as a gift',
                dontSendGift: 'Do not send as a gift'
            },
            states: {
                AL: 'Alabama',
                AR: 'Arizona',
                CA: 'California',
                NV: 'Nevada'
            }
        }
    },
    created() {
        axios.get('/products.json')
            .then(res => {
                this.products = res.data.products;
            })
    },
    components: {},
    computed: {
        cartItemCount() {
            return this.cart.length || 0;
        },
        sortedProducts(){
            if(this.products.length){
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
        showCheckout() {
            this.showProduct = !this.showProduct
        },
        submitForm(e) {
            e.preventDefault();
            console.log(1);
        },
        checkRating(n, myPdoduct){
            return myPdoduct.rating - n >= 0;
        },
        canAddToCart(product) {
            return product.availableInventory > this.cartCount(product.id)
        },
        cartCount(id){
            let count = 0;
            for (let i = 0; i < this.cart.length; i++){
                if(this.cart[i] === id){
                    count++
                }
            }
            return count
        },
        compare(a, b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            return 0
        }
    }
}
</script>

<style>
/*@import "./assets/css/main.css";*/

.content {
    display: flex;
    justify-content: center;
    align-items: center;
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
    float:right;
}

.rating > span {
    display: inline-block;
    position: relative;
    width: 1.1em;
}
</style>
