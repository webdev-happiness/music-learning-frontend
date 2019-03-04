<template>
    <div class="categ-filters">
        <ul class="categ-filters__list">
            <li>
                <v-chip @click="chose(null)">Tous</v-chip>
            </li>
            <li v-for="c in categories" :key="c.id">
                <v-chip @click="chose(c)">{{c.label}}</v-chip>
            </li>
        </ul>
    </div>
</template>
<script>
import store from '@/store/store';
import { mapGetters } from 'vuex';

export default {
    store,
    computed: {
        ...mapGetters({
            categories: 'categories/list',
        }),
    },
    methods: {
        chose(c) {
            this.$emit('selected', c);
        }
    }
}
</script>

<style lang="scss" scoped>
    .v-chip .v-chip__content{
        cursor: pointer!important;
    }

    .categ-filters {
        &__list{
            li {
                display: inline-block;

            }
        }
    }
</style>
