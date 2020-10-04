<template>
    <div>
        <my-header :cartItemCount="cartItemCount"></my-header>
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
</template>

<script>
import MyHeader from './Header'

export default {
    name: "Form",
    props: [
        'cartItemCount'
    ],
    data () {
        return {
            states: {
                AL: 'Alabama',
                AK: 'Alaska',
                AR: 'Arizona',
                CA: 'California',
                NV: 'Nevada'
            },
            order: {
                firstName: '',
                lastName: '',
                address: '',
                city: '',
                zip: '',
                state: '',
                method: 'Home Address',
                business: 'Business Address',
                home: 'Home Address',
                gift:'',
                sendGift: 'Send As A Gift',
                dontSendGift: 'Do Not Send As A Gift'
            }

        }
    },
    components: {
        MyHeader
    },
    methods: {
        submitForm() {
            alert('Submitted');
        }
    }
}
</script>

<style scoped>

</style>