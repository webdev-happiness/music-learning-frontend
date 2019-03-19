<template>
    <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
            <span>{{(selected != null) ? selected.label : "Tous"}}</span>
            <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
            <v-list-tile
                @click="chose(null)"
            >
                <v-list-tile-title v-text="'Tous'"></v-list-tile-title>
            </v-list-tile>
            <v-list-tile
                v-for="c in categories"
                :key="c.id"
                @click="chose(c)"
            >
                <v-list-tile-title v-text="c.label"></v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-menu>
</template>
<script>
import store from '@/store/store';
import { mapGetters } from 'vuex';

export default {
    store,
    data() {
        return {
            selected: null,
        }
    },
    computed: {
        ...mapGetters({
            categories: 'categories/list',
        }),
    },
    methods: {
        chose(c) {
            this.selected = c
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
