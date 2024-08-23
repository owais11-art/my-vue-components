<script lang="ts" setup>
    import { RouterLink } from 'vue-router'

    interface ILink {
        label: string,
        linkName: string
    }

    const links: ILink[] = [
        {
            label: 'Slider',
            linkName: 'slider'
        },
        {
            label: 'Splitter',
            linkName: 'splitter'
        }
    ]
</script>
<template>
    <div class="links">
        <router-link
            v-for="link in links"
            :key="link.linkName"
            :to="{name: link.linkName}"
            active-class="active"
            class="link">
                {{ link.label }}
        </router-link>
    </div>
</template>
<style scoped>
    .links{
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-right: 5px;

        & .link{
            padding: 10px;
            cursor: pointer;
            font-size: 18px;
            font-weight: bold;
            color: var(--color);
            border-radius: 0 50px 50px 0;
            
            &:hover, &.active{
                background-color: var(--color-light);
            }
        }
    }
</style>