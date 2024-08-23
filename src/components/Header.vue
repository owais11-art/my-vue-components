<template>
    <header>
        <h1>My <span>Vue</span> Components</h1>
    </header>
</template>

<style scoped>
    header{
        padding: 20px 10px;
        border-bottom: 1.6px solid var(--color-light);
    }
    h1{
        color: #00000080;
        & span{
            color: var(--color);
        }
    }
</style>